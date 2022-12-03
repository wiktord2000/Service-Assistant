using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.OrderProductsDtos;
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
    public class OrderProductsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OrderProductsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProductDto>>> GetOrderProducts([FromQuery] int? orderId)
        {   
            var userId = User.GetUserId();    // -> Extensions

            if(orderId != null){
                return await _context.OrderProducts
                            .Where(orderProduct => orderProduct.Order.AppUser.Id == userId && orderProduct.Order.Id == orderId)
                            .ProjectTo<OrderProductDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
            }

            return await _context.OrderProducts
                            .Where(orderProduct => orderProduct.Order.AppUser.Id == userId)
                            .ProjectTo<OrderProductDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderProductDto>> GetOrderProduct(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var orderProduct = await _context.OrderProducts
                            .Where(orderProduct => orderProduct.Id == id && orderProduct.Order.AppUser.Id == userId)
                            .ProjectTo<OrderProductDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();

            if(orderProduct == null) return NotFound("Nie znaleziono zasobu o podanym id!");

            return orderProduct;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderProduct(int id, OrderProductUpdateDto orderProduct)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var orderProductToUpdate = await _context.OrderProducts.FirstOrDefaultAsync(orderProduct => orderProduct.Id == id 
                && orderProduct.Order.AppUserId == userId);

            if(orderProductToUpdate == null) return NotFound($"Zasób o Id {id} nie istnieje!");

            _mapper.Map(orderProduct, orderProductToUpdate);
            _context.OrderProducts.Update(orderProductToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zasobu!");
        }

        [HttpPost]
        public async Task<ActionResult<OrderProductDto>> CreateOrderProduct(OrderProductCreateDto orderProduct)
        {   
            OrderProduct newOrderProduct = new OrderProduct();

            _mapper.Map(orderProduct, newOrderProduct);
            _context.OrderProducts.Add(newOrderProduct);

            if(await _context.SaveChangesAsync() > 0){
                return _mapper.Map(newOrderProduct, new OrderProductDto());
            } 
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem zasobu!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderProduct(int id)
        {   
            var orderProductToDelete = await _context.OrderProducts.FirstOrDefaultAsync(orderProduct => (orderProduct.Id == id));

            if(orderProductToDelete == null) return NotFound($"Zasób o Id {id} nie istnieje!");

            _context.OrderProducts.Remove(orderProductToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem zasobu!");
        }
    }
}