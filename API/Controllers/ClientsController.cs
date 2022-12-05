using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.ClientDtos;
using API.DTOs.StatisticsDtos;
using API.Entities;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]     // We provide auto token attach in Angular interceptor
    public class ClientsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ClientsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetClients([FromQuery] int? vehicleId)
        {   
            var username = User.GetUsername();    // -> Extensions

            if(vehicleId != null){
                return await _context.Clients
                            .Where(client => client.AppUser.UserName == username && client.Vehicles.Any((vehicle) => vehicle.Id == vehicleId))
                            .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
            }

            return await _context.Clients
                            .Where(client => client.AppUser.UserName == username)
                            .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetClientsSerach([FromQuery] int clientsNumber, [FromQuery] string match)
        {   
            var username = User.GetUsername();    // -> Extensions

            return await _context.Clients
                    .Where(client => (client.AppUser.UserName == username 
                        && ((client.Type == "company" ? client.CompanyName : client.Firstname + " " + client.Lastname).ToLower().Contains(match) 
                        || match == null))) 
                            
                    .Take(clientsNumber)
                    .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        [HttpGet]
        [Route("statistics")]
        public async Task<ActionResult<IEnumerable<ClientOrdersStatistics>>> GetClientsStatistics([FromQuery] int clientsCount = 10)
        {   
            var userId = User.GetUserId();    // -> Extensions

            return await _context.Orders
                            .Where((order) => order.AppUserId == userId)
                            .GroupBy((order) => order.ClientId)
                            .Select(g => new ClientOrdersStatistics{ ClientId = (int)g.Key, OrdersCount = g.Count() })
                            .OrderByDescending((obj) => obj.OrdersCount)
                            .Take(clientsCount).
                            ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDetailsDto>> GetClient(int id, [FromQuery] bool brief = false )
        {   
            var userId = User.GetUserId();    // -> Extensions

            ClientDetailsDto client = new ClientDetailsDto();

            if(brief){
                var briefClient = await _context.Clients
                    .Where(client => client.AppUserId == userId)
                    .ProjectTo<ClientDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(client => client.Id == id);

                _mapper.Map(briefClient, client);
            }
            else{
                client = await _context.Clients
                    .Where(client => client.AppUserId == userId)
                    .ProjectTo<ClientDetailsDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(client => client.Id == id);
            }

            if(client == null) return NotFound("Nie znaleziono klienta o podanym id!");
            return client;
        }

        [HttpPost]
        public async Task<ActionResult<ClientDto>> CreateClient(ClientCreateDto client)
        {   
            Client newClient = new Client();

            _mapper.Map(client, newClient);
            newClient.AppUserId = User.GetUserId();
            _context.Clients.Add(newClient);

            if(await _context.SaveChangesAsync() > 0) return _mapper.Map(newClient, new ClientDto());
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem klienta!");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClient(int id, ClientUpdateDto client)
        {   
            // var username = User.GetUsername();    // -> Extensions

            Client clientToUpdate = await _context.Clients.FirstOrDefaultAsync(client => client.Id == id);

            if(clientToUpdate == null) return NotFound($"Klient o Id {id} nie istnieje!");

            // // Change UpdateAt date
            // client.UpdatedAt = DateTime.Now; -> probably unnecessery when update dto (public DateTime UpdatedAt { get; set; } = DateTime.Now)

            _mapper.Map(client, clientToUpdate);
            _context.Clients.Update(clientToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją klienta!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions (obtain id of sender)

            var clientToDelete = await _context.Clients.FirstOrDefaultAsync(client => (client.Id == id) && client.AppUserId == userId);

            if(clientToDelete == null) return NotFound($"Klient o Id {id} nie istnieje!");

            _context.Clients.Remove(clientToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem klienta!");
        }

    }
}