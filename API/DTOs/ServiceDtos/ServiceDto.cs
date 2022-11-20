using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float CostNet { get; set; }
        public float CostGross { get; set; }
        public string Unit { get; set; }
        public float EstimatedTime { get; set; }
        public float TotalNet { get; set; }
        public float TotalGross { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}