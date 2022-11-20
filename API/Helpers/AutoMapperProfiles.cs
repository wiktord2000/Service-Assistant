using API.DTOs;
using API.DTOs.ClientDtos;
using API.DTOs.ProductDtos;
using API.DTOs.ServiceDtos;
using API.DTOs.VehicleDtos;
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
            CreateMap<Vehicle, VehicleDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDetailsDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Status, StatusDto>();
            CreateMap<Status, StatusDto>().ReverseMap();
            CreateMap<ClientUpdateDto, Client>();
            CreateMap<ClientCreateDto, Client>();
            CreateMap<VehicleUpdateDto, Vehicle>();
            CreateMap<VehicleCreateDto, Vehicle>();
            // Service
            CreateMap<ServiceDto, Service>();
            CreateMap<ServiceDto, Service>().ReverseMap();
            CreateMap<ServiceUpdateDto, Service>();
            CreateMap<ServiceUpdateDto, Service>().ReverseMap();
            CreateMap<ServiceCreateDto, Service>();
            CreateMap<ServiceCreateDto, Service>().ReverseMap();
            // Product
            CreateMap<ProductDto, Product>();
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<ProductUpdateDto, Product>();
            CreateMap<ProductUpdateDto, Product>().ReverseMap();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductCreateDto, Product>().ReverseMap();
        }
    }
}