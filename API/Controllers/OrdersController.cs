using API.Data;
using API.DTOs;
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
            var username = User.GetUsername();    // -> Extensions

            return await _context.Orders
                            .Where(order => order.AppUser.UserName == username && (statusPositions.Length == 0 || statusPositions.Contains(order.Status.Position)))
                            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {   
            // var username = User.GetUsername();    // -> Extensions

            var order = await _context.Orders
                            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync(order => order.Id == id);

            if(order == null) return NotFound("Nie znaleziono zlecenia o podanym id!");

            return order;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>>UpdateOrder(int id, OrderDto order){
            // Probably we should check that specific user contains this order
            // if(!(await this.OrderExists(id))) return BadRequest("Zlecenie o danym id nie istnieje!");

            if(id != order.Id) return BadRequest("Niepoprawne id");

            Order orderToUpdate = await _context.Orders.FirstOrDefaultAsync(order => order.Id == id);

            if(orderToUpdate == null) return NotFound($"Zlecenie o Id {id} nie istnieje!");

            orderToUpdate.OrderNumber = order.OrderNumber;
            orderToUpdate.AdmissionDate = order.AdmissionDate;
            orderToUpdate.DeadlineDate = order.DeadlineDate;
            orderToUpdate.ClientDescription = order.ClientDescription;
            orderToUpdate.RepairDescription = order.RepairDescription;
            orderToUpdate.InvoiceId = order.InvoiceId;
            orderToUpdate.Mileage = order.Mileage;
            orderToUpdate.TotalJobsNet = order.TotalJobsNet;
            orderToUpdate.TotalJobsGross = order.TotalJobsGross;
            orderToUpdate.TotalPartsNet = order.TotalPartsNet;
            orderToUpdate.TotalNet = order.TotalNet;
            orderToUpdate.TotalGross = order.TotalGross;
            orderToUpdate.FinishDate = order.FinishDate;
            orderToUpdate.ClientId = order.ClientId;
            orderToUpdate.VehicleId = order.VehicleId;

            _context.Orders.Update(orderToUpdate);
                
            if(await _context.SaveChangesAsync() > 0) return orderToUpdate;
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zlecenia!");
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult>UpdateOrderPatch(int id, [FromBody] JsonPatchDocument<Order> patchOrder){

            if(patchOrder == null) return BadRequest(ModelState);

            var orderToUpdate = await _context.Orders.FirstOrDefaultAsync((order) => order.Id == id);
            if(orderToUpdate == null) return NotFound($"Zlecenie o Id {id} nie istnieje!");

            patchOrder.ApplyTo(orderToUpdate, ModelState);
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if(await _context.SaveChangesAsync() > 0) return NoContent();

            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją zlecenia!");
        }


        // Check whether specific order exists in db
        private async Task<bool> OrderExists(int orderId)
        {
            // Get current username
            var username = User.GetUsername();
            return await _context.Orders.AnyAsync((order) => order.Id == orderId && order.AppUser.UserName == username);
        }
    }
}