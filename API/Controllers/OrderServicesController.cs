using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.OrderServicesDtos;
using API.Entities;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Authorize]
    public class OrderServicesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderServicesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderServiceDto>>> GetOrderServices()
        {   
            var userId = User.GetUserId();    // -> Extensions

            return await _context.OrderServices
                            .Where(orderService => orderService.Order.AppUser.Id == userId)
                            .ProjectTo<OrderServiceDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderServiceDto>> GetOrderService(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var orderService = await _context.OrderServices
                            .Where(orderService => orderService.Id == id && orderService.Order.AppUser.Id == userId)
                            .ProjectTo<OrderServiceDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();

            if(orderService == null) return NotFound("Nie znaleziono zasobu o podanym id!");

            return orderService;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderService(int id, OrderServiceUpdateDto orderService)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var orderServiceToUpdate = await _context.OrderServices.FirstOrDefaultAsync(orderService => orderService.Id == id 
                && orderService.Order.AppUserId == userId);

            if(orderServiceToUpdate == null) return NotFound($"Zasób o Id {id} nie istnieje!");

            _mapper.Map(orderService, orderServiceToUpdate);
            _context.OrderServices.Update(orderServiceToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zasobu!");
        }

        [HttpPost]
        public async Task<ActionResult<OrderServiceDto>> CreateOrderService(OrderServiceCreateDto orderService)
        {   
            OrderService newOrderService = new OrderService();

            _mapper.Map(orderService, newOrderService);
            _context.OrderServices.Add(newOrderService);

            if(await _context.SaveChangesAsync() > 0){
                return _mapper.Map(newOrderService, new OrderServiceDto());
            } 
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem zasobu!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderService(int id)
        {   
            var orderServiceToDelete = await _context.OrderServices.FirstOrDefaultAsync(orderService => (orderService.Id == id));

            if(orderServiceToDelete == null) return NotFound($"Zasób o Id {id} nie istnieje!");

            _context.OrderServices.Remove(orderServiceToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem zasobu!");
        }
    }
}