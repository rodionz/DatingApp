using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMaapperProfile : Profile
    {
        public AutoMaapperProfile(){

            CreateMap<User,UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).URL);
                })
                .ForMember(dest => dest.Age, opt => {
                   opt.ResolveUsing(d => d.DateOfBirth.Age());
                });

            CreateMap<User,UserForDetailDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).URL);
                })
                .ForMember(dest => dest.Age, opt => {
                   opt.ResolveUsing(d => d.DateOfBirth.Age());
                });

            CreateMap<Photo, PhotoForDetailsDto>();
        }
    }
}