using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

    //[Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repository, IMapper mapper)
        {
            this._mapper = mapper;
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers(UserParams userParams)
        {
            var users = await _repository.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto){
           
           if(!ModelState.IsValid)
               return BadRequest(ModelState);

           var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);  

           var userFromRepo = await _repository.GetUser(id);  

           if(userFromRepo == null)
               return NotFound($"Could not find user whith an ID of {id}");

           if(currentUserId != userFromRepo.Id)    
               return Unauthorized();

           _mapper.Map(userForUpdateDto, userFromRepo);   

           if(await _repository.SavaAll()) 
              return NoContent();


           throw new Exception ("Failure on Save");  
        }
    }
}