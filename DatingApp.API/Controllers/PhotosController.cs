using AutoMapper;
using CloudinaryDotNet;
using DatingApp.API.Data;
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
        private readonly IOptions<CloudinarySettings> _clodinarySettings;

        public PhotosController (IDatingRepository repository,
            IMapper mapper,
            IOptions<CloudinarySettings> clodinarySettings) {

            this._clodinarySettings = clodinarySettings;
            this._repository = repository;
            this._mapper = mapper;
            Account acc = new Account();
        }

    }
}