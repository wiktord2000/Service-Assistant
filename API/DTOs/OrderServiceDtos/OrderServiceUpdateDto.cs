using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.OrderServicesDtos
{
    public class OrderServiceUpdateDto
    {
        [Required]
        public string ApprovedServiceName { get; set; }
        public float ApprovedEstimatedTime { get; set; }
        public float ApprovedCostGross { get; set; }
        public float WorkedTime { get; set; }
    }
}