using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers {
    [Authorize]
    [Route ("api/users/{userId}/photos")]
    public class PhotosController : Controller {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _clodinaryConfig;
        private readonly Cloudinary _cloudinary;

        public PhotosController (IDatingRepository repository,
            IMapper mapper,
            IOptions<CloudinarySettings> clodinaryConfig) {

            this._clodinaryConfig= clodinaryConfig;
            this._repository = repository;
            this._mapper = mapper;

            Account acc = new Account(
               _clodinaryConfig.Value.CloudName,
               _clodinaryConfig.Value.ApiKey,
               _clodinaryConfig.Value.ApiSecret              
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = _repository.GetPhoto(id);

            var photo =_mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
            
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoDto)
        {
            var user = await _repository.GetUser(userId);

            if(user == null)
               return BadRequest("Could not find user");

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);   

            if (currentUserId != userId)
               return Unauthorized();

             var file = photoDto.File;

             var uploadResult = new ImageUploadResult();  

             if(file.Length > 0)
             {
                 using (var stream = file.OpenReadStream())
                 {
                     var uploadParams = new ImageUploadParams()
                     {
                         File = new FileDescription(file.Name, stream),
                         Transformation = new Transformation()
                         .Width(500).Height(500).Crop("fill").Gravity("face")
                     };
                    
                   uploadResult = _cloudinary.Upload(uploadParams);
                 }
             }
             photoDto.Url = uploadResult.Uri.ToString();
             photoDto.PublicId = uploadResult.PublicId;

             var photo =_mapper.Map<Photo>(photoDto);
             photo.User = user;

             if(!user.Photos.Any(m => m.IsMain))
                 photo.IsMain = true;

              user.Photos.Add(photo);

              var photoToreturn = _mapper.Map<PhotoForReturnDto>(photo);

              if(await _repository.SavaAll())
              {
                  return CreatedAtRoute("GetPhoto", new {id = photo.Id}, photoToreturn);
              }   

              return BadRequest("Could no add the photo");
        }

        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
              return Unauthorized();

            var photoFromRepo = await _repository.GetPhoto(id);
            if(photoFromRepo == null)
              return NotFound();

            if (photoFromRepo.IsMain)
              return BadRequest("This is already the main photo");

            var currentMainPhoto = await _repository.GetMainPhotoForUser(userId);  
            if (currentMainPhoto != null)
               currentMainPhoto.IsMain = false;

           photoFromRepo.IsMain = true;

           if(await _repository.SavaAll())
             return NoContent();


         return BadRequest("Could not set photo to main");        
        }

    }
}