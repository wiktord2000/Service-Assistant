using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string CompanyName { get; set; }
        public string Nip { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int? DiscountJobs { get; set; }
        public int? DiscountParts { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}