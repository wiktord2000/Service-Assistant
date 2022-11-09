using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class VehicleUpdateDto
    {
        [Required(ErrorMessage = "Marka jest wymagana")]
        public string Brand { get; set; }
        [Required(ErrorMessage = "Model jest wymagany")]
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        public string Vin { get; set; }
        public string EngineCode { get; set; }
        public int? Capacity { get; set; }
        public string EngineFuel { get; set; }
        public int? EnginePower { get; set; }
        public string Color { get; set; }
        public int? ProductionDate { get; set; }
        public DateTime? FirstRegistration { get; set; }
        public DateTime? TechnicalInspectionEnd { get; set; }
        public string Description { get; set; }
        public int CurrentOwnerId { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
