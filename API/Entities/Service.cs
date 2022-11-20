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
        public float estimatedTime { get; set; }
        public float totalNet { get; set; }
        public float totalGross { get; set; }
        public DateTime createdAt { get; set; }  = DateTime.Now;
        public DateTime updatedAt { get; set; }  = DateTime.Now;

        // Foreign keys
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}