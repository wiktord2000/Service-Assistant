using API.DTOs;
using API.DTOs.ClientDtos;
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
            CreateMap<Client, ClientDetailsDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<Vehicle, VehicleDetailsDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Status, StatusDto>();
            CreateMap<Status, StatusDto>().ReverseMap();
            CreateMap<ClientUpdateDto, Client>();
            CreateMap<ClientCreateDto, Client>();
            CreateMap<VehicleUpdateDto, Vehicle>();
            // CreateMap<Order, OrderDto>();
        }
    }
}