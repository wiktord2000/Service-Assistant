using System.ComponentModel.DataAnnotations;

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
        public int? ProductionDate { get; set; }
        public DateTime? FirstRegistration { get; set; }
        public DateTime? TechnicalInspectionEnd { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int AppUserId { get; set; }
        public int? CurrentOwnerId { get; set; }
        public AppUser AppUser { get; set; }
        public Client CurrentOwner { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}