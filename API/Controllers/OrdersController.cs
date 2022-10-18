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
        public readonly DataContext _context;
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
    }
}