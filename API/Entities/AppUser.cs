using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        public string CompanyName { get; set; }
        public int? Nip { get; set; }
        public string Voivodeship { get; set; }     // województwo
        public string Township { get; set; }        // powiat
        public string Borough { get; set; }         // gmina
        public int? PostalCode { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public int? ContactNumber { get; set; }
        public string Email { get; set; }
        public int? AccountNumber { get; set; }
        public string BankName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<Order> Orders { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
        public ICollection<Client> Clients { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}