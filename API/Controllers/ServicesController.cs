using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.ServiceDtos;
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
    public class ServicesController : BaseApiController
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ServicesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetServices()
        {   
            var userId = User.GetUserId();    // -> Extensions

            return await _context.Services
                            .Where(service => service.AppUser.Id == userId)
                            .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetServicesSerach([FromQuery] int servicesNumber, [FromQuery] string match)
        {   
            var userId = User.GetUserId();   // -> Extensions

            return await _context.Services
                    .Where(service => (service.AppUser.Id == userId 
                        && (service.Name.ToLower().Contains(match) 
                        || match == null))) 
                            
                    .Take(servicesNumber)
                    .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDto>> GetService(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var service = await _context.Services
                            .Where(service => service.Id == id && service.AppUserId == userId)
                            .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();

            if(service == null) return NotFound("Nie znaleziono serwisu o podanym id!");

            return service;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateService(int id, ServiceUpdateDto service)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var serviceToUpdate = await _context.Services.FirstOrDefaultAsync(service => service.Id == id && service.AppUserId == userId);

            if(serviceToUpdate == null) return NotFound($"Serwis o Id {id} nie istnieje!");

            _mapper.Map(service, serviceToUpdate);
            _context.Services.Update(serviceToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją serwisu!");
        }

        [HttpPost]
        public async Task<ActionResult<ServiceDto>> CreateService(ServiceCreateDto service)
        {   
            Service newService = new Service();

            _mapper.Map(service, newService);
            newService.AppUserId = User.GetUserId();
            _context.Services.Add(newService);

            if(await _context.SaveChangesAsync() > 0) return _mapper.Map(newService, new ServiceDto());
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem serwisu!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteService(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions (obtain id of sender)

            var serviceToDelete = await _context.Services.FirstOrDefaultAsync(service => (service.Id == id) && service.AppUserId == userId);

            if(serviceToDelete == null) return NotFound($"Serwis o Id {id} nie istnieje!");

            _context.Services.Remove(serviceToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem serwisu!");
        }
    }
}