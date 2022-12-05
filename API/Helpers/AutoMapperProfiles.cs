using API.DTOs;
using API.DTOs.ClientDtos;
using API.DTOs.OrderDtos;
using API.DTOs.OrderProductsDtos;
using API.DTOs.OrderServicesDtos;
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
            // Client
            CreateMap<Client, ClientDto>();
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<Client, ClientDetailsDto>();
            CreateMap<Client, ClientDetailsDto>().ReverseMap();
            CreateMap<Client, ClientUpdateDto>();
            CreateMap<Client, ClientUpdateDto>().ReverseMap();
            CreateMap<Client, ClientCreateDto>();
            CreateMap<Client, ClientCreateDto>().ReverseMap();
            CreateMap<ClientDto, ClientDetailsDto>();
            CreateMap<ClientDto, ClientDetailsDto>().ReverseMap();
            // Vehicle
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<Vehicle, VehicleDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDetailsDto>();
            CreateMap<VehicleUpdateDto, Vehicle>();
            CreateMap<VehicleCreateDto, Vehicle>();
            // Order
            CreateMap<Order, OrderDto>();
            CreateMap<Order, OrderDto>().ReverseMap();
            // Satus
            CreateMap<Status, StatusDto>();
            CreateMap<Status, StatusDto>().ReverseMap();
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
            // Order
            CreateMap<OrderDto, Order>();
            CreateMap<OrderDto, Order>().ReverseMap();
            CreateMap<OrderDetailsDto, Order>();
            CreateMap<OrderDetailsDto, Order>().ReverseMap();
            CreateMap<OrderUpdateDto, Order>();
            CreateMap<OrderUpdateDto, Order>().ReverseMap();
            CreateMap<OrderCreateDto, Order>();
            CreateMap<OrderCreateDto, Order>().ReverseMap();
            // OrderService
            CreateMap<OrderServiceDto, OrderService>();
            CreateMap<OrderServiceDto, OrderService>().ReverseMap();
            CreateMap<OrderServiceUpdateDto, OrderService>();
            CreateMap<OrderServiceUpdateDto, OrderService>().ReverseMap();
            CreateMap<OrderServiceCreateDto, OrderService>();
            CreateMap<OrderServiceCreateDto, OrderService>().ReverseMap();
            // OrderProduct
            CreateMap<OrderProductDto, OrderProduct>();
            CreateMap<OrderProductDto, OrderProduct>().ReverseMap();
            CreateMap<OrderProductUpdateDto, OrderProduct>();
            CreateMap<OrderProductUpdateDto, OrderProduct>().ReverseMap();
            CreateMap<OrderProductCreateDto, OrderProduct>();
            CreateMap<OrderProductCreateDto, OrderProduct>().ReverseMap();
        }
    }
}