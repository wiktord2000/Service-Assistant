using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
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

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(int userId)
        {   
            var orders = await _context.Orders
                            .Where(order => order.AppUserId == userId)
                            .Include(or => or.Client)
                            .ToListAsync();

            // var orders = await _context.Clients.Include(client => client.Orders).ToListAsync();
            return orders;
        }
    }
}