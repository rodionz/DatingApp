using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
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
                         File = new FileDescription(file.Name, stream)
                     };
                    
                   uploadResult = _cloudinary.Upload(uploadParams);
                 }
             }
             photoDto.Url = uploadResult.Uri.ToString();
        }

    }
}