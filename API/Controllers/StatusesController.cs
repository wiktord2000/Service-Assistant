using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.CustomClasses;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class StatusesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StatusesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private List<StatusLabel> possibleStatuses = new List<StatusLabel>{
            new StatusLabel(0, "Wycena"),
            new StatusLabel(1, "Akceptacja"),
            new StatusLabel(2, "Naprawa"),
            new StatusLabel(3, "Gotowe"),
            new StatusLabel(4, "Zakończone"),
        };

        [HttpGet]
        public ActionResult<Object>GetPossibleStatuses(){
            return Ok(this.possibleStatuses);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Object>>UpdateStatus(int id, StatusDto status){

            if(id != status.Id) return BadRequest("Niepoprawne id");

            Status statusToUpdate = await _context.Statuses.FirstOrDefaultAsync(status => status.Id == id);

            if(statusToUpdate == null) return NotFound($"Status o Id {id} nie istnieje!");

            // Update (automapper need)
            // statusToUpdate.Position = status.Position;
            // statusToUpdate.Name = status.Name;
            // statusToUpdate.IsPaid = status.IsPaid;
            // statusToUpdate.HasInvoice = status.HasInvoice;
            // statusToUpdate.IsPaid = status.IsPaid;
            // statusToUpdate.EmailSend = status.EmailSend;
            _mapper.Map(status, statusToUpdate);

            // Only track changes
            _context.Statuses.Update(statusToUpdate);  
            // Returns number of deployed changes in entities
            if(await _context.SaveChangesAsync() > 0) return statusToUpdate;

            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją statusu!");
        }
    }
}