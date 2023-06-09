using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Service
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public float CostNet { get; set; }
        public float CostGross { get; set; }
        [Required]
        public string Unit { get; set; }
        public float EstimatedTime { get; set; }
        public float TotalNet { get; set; }
        public float TotalGross { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}