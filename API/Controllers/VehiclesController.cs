using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class VehiclesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VehiclesController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDetailsDto>>> GetVehicles()
        {   
            var username = User.GetUsername();    // -> Extensions

            return await _context.Vehicles
                            .Where(vehicle => vehicle.AppUser.UserName == username)
                            .ProjectTo<VehicleDetailsDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        // Get specific vehicle
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDetailsDto>> GetVehicle(int id)
        {   
            // var username = User.GetUsername();    // -> Extensions

            var vehicle = await _context.Vehicles
                            .ProjectTo<VehicleDetailsDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync(vehicle => vehicle.Id == id);

            if(vehicle == null) return NotFound("Nie znaleziono pojazdu o podanym id!");

            return vehicle;
        }

    }
}