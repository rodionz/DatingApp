using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers {
        
        [Authorize]
        [Route("api/[controller]")]
        public class UsersController : Controller {
        private readonly IDatingRepository _repository;
        public UsersController (IDatingRepository repository) {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers ()
        {
           var users = await _repository.GetUsers();

           return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            return Ok(user);
        }
    }
}