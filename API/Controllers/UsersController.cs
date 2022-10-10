using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    // ! Obsolete when derive from BaseApiController class 
    //   [ApiController]
    //   [Route("api/[controller]")]       // [controller] === "users"     !!! It refers for all class so every request will start with "api/[controller]"
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepositiory;
        public UsersController(IUserRepository userRepositiory)
        {
            _userRepositiory = userRepositiory;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {   
            var users = await _userRepositiory.GetUsersAsync();
            return Ok(users);
        }

        // api/users/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _userRepositiory.GetUserByIdAsync(id);
        }
    }
}