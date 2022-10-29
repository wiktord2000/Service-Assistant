using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]     // We provide auto token attach IdentityServiceExtensions
    public class ClientsController : BaseApiController
    {
        private readonly DataContext _context;
        public IMapper _mapper { get; }
        public ClientsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDetailsDto>> GetClient(int id)
        {   
            // var username = User.GetUsername();    // -> Extensions

            var client = await _context.Clients
                            .ProjectTo<ClientDetailsDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync(client => client.Id == id);

            if(client == null) return NotFound("Nie znaleziono klienta o podanym id!");

            return client;
        }
    }
}