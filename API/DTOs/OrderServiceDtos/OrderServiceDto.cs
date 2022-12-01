using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderServiceDto
    {
        public int Id { get; set; }
        public string ApprovedServiceName { get; set; }
        public float ApprovedEstimatedTime { get; set; }
        public float ApprovedCostGross { get; set; }
        public float WorkedTime { get; set; }
        public int OrderId { get; set; }
        public int ServiceId { get; set; }
    }
}