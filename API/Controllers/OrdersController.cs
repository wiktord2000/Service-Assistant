using API.Data;
using API.DTOs;
using API.DTOs.OrderDtos;
using API.DTOs.OrderServicesDtos;
using API.DTOs.ProductDtos;
using API.Entities;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Using include: https://learn.microsoft.com/en-gb/ef/core/querying/related-data/eager

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrdersController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] int[] statusPositions)
        {   
            var userId = User.GetUserId();    // -> Extensions

            return await _context.Orders
                            .Where(order => order.AppUser.Id == userId && (statusPositions.Length == 0 || statusPositions.Contains(order.Status.Position)))
                            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrder(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var order = await _context.Orders
                            .Where(order => order.Id == id && order.AppUserId == userId)
                            .ProjectTo<OrderDetailsDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();

            if(order == null) return NotFound("Nie znaleziono zlecenia o podanym id!");

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(OrderCreateDto order)
        {   
            Order newOrder = new Order();
            // Provide orderNumber (server side)
            var currentDate = DateTime.Now;
            var dateUniqueValue = currentDate.Hour*currentDate.Minute*currentDate.Second;
            newOrder.OrderNumber = $"ZL {currentDate.Year.ToString().Substring(2)}/{currentDate.Month}/{currentDate.Day}.{dateUniqueValue}";
            var newState = new Status();
            // Provide new Status
            _context.Statuses.Add(newState);
            if(await _context.SaveChangesAsync() <= 0) StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem statusu!");
            newOrder.StatusId = newState.Id;

            _mapper.Map(order, newOrder);
            newOrder.AppUserId = User.GetUserId();
            _context.Orders.Add(newOrder);

            if(await _context.SaveChangesAsync() > 0){
                return _mapper.Map(newOrder, new OrderDto());
            } 
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem zlecenia!");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>>UpdateOrder(int id, OrderUpdateDto order){
            var userId = User.GetUserId();    // -> Extensions

            var orderToUpdate = await _context.Orders.FirstOrDefaultAsync(order => order.Id == id && order.AppUserId == userId);

            if(orderToUpdate == null) return NotFound($"Zlecenie o Id {id} nie istnieje!");

            _mapper.Map(order, orderToUpdate);
            _context.Orders.Update(orderToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zlecenia!");
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult>UpdateOrderPatch(int id, [FromBody] JsonPatchDocument<Order> patchOrder){

            if(patchOrder == null) return BadRequest(ModelState);

            var userId = User.GetUserId();    // -> Extensions
            var orderToUpdate = await _context.Orders.FirstOrDefaultAsync(order => order.Id == id && order.AppUserId == userId);
            if(orderToUpdate == null) return NotFound($"Zlecenie o Id {id} nie istnieje!");

            patchOrder.ApplyTo(orderToUpdate, ModelState);
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if(await _context.SaveChangesAsync() > 0) return NoContent();

            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zlecenia!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions (obtain id of sender)

            var orderToDelete = await _context.Orders.FirstOrDefaultAsync(order => (order.Id == id) && order.AppUserId == userId);

            if(orderToDelete == null) return NotFound($"Zlecenie o Id {id} nie istnieje!");

            _context.Orders.Remove(orderToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem zlecenia!");
        }
    }
}