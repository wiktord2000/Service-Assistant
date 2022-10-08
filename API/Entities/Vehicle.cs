using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Vehicle
    {
        public int Id { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string RegistrationNumber { get; set; }
        public string Vin { get; set; }
        public string EngineCode { get; set; }
        public int? Capacity { get; set; }
        public string EngineFuel { get; set; }
        public int? EnginePower { get; set; }
        public string EnginePowerUnit { get; set; }
        public string Color { get; set; }
        public DateTime? ProductionDate { get; set; }
        public DateTime? FirstRegistration { get; set; }
        public DateTime? TechnicalInspectionEnd { get; set; }
        public string Description { get; set; }
        [Required]
        public Client CurrentOwner { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}