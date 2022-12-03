using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.OrderServicesDtos
{
    public class OrderServiceCreateDto
    {
        [Required]
        public string ApprovedServiceName { get; set; }
        public float ApprovedEstimatedTime { get; set; }
        public float ApprovedCostGross { get; set; }
        public float WorkedTime { get; set; }
        public bool IsCompleted { get; set; }
        [Required]
        public int? OrderId { get; set; }
        [Required]
        public int? ServiceId { get; set; }
    }
}