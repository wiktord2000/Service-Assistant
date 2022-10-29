using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Map <From , To>
            CreateMap<Client, ClientDto>();
            CreateMap<Client, ClientDetailsDto>();
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<Vehicle, VehicleDetailsDto>();
            CreateMap<Order, OrderDto>();
            // CreateMap<Order, OrderDto>();
        }
    }
}