using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Manufacturer { get; set; }
        [Required]
        public string Unit { get; set; }
        public string Ean { get; set; }
        public int Availability { get; set; }
        public int Reserved { get; set; }
        public string Description { get; set; }
        public string Notice { get; set; }
        public int? Grade { get; set; }
        public float Vat { get; set; }
        public float BuyPriceNet { get; set; }
        public float BuyPriceGross { get; set; }
        public float SalesPriceNet { get; set; }
        public float SalesPriceGross { get; set; }
        public float Profit { get; set; }
        public float Markup { get; set; }
        public float Margin { get; set; }
        public DateTime? LastDeliveryDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}