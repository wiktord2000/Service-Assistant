using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class OrderService
    {
        public int Id { get; set; }
        [Required]
        public string ApprovedServiceName { get; set; }
        public float ApprovedEstimatedTime { get; set; }
        public float ApprovedCostGross { get; set; }
        public float WorkedTime { get; set; }
        public bool IsCompleted { get; set; } = false;
        // Foreign keys
        public int OrderId { get; set; }
        public int ServiceId { get; set; }
        public Order Order { get; set; }
        public Service Service { get; set; }
    }
}