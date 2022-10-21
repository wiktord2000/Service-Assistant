using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Using include: https://learn.microsoft.com/en-gb/ef/core/querying/related-data/eager

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly DataContext _context;
        public OrdersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] int[] statusPositions)
        {   
            var username = User.GetUsername();    // -> Extensions

            return  await _context.Orders
                            .Include(order => order.Status)
                            .Where(order => order.AppUser.UserName == username && (statusPositions.Length == 0 || statusPositions.Contains(order.Status.Position)))
                            .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>>UpdateOrder(int id, Order newOrder){
            // Probably we should check that specific user contains this order

            if(!(await this.OrderExists(id))) return BadRequest("Zlecenie o danym id nie istnieje!");

            _context.Orders.Update(newOrder);

            if(await _context.SaveChangesAsync() > 0) return newOrder;
            return BadRequest("Zlecenie nie może zostać zaktualizowane");

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