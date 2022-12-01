using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class OrderService
    {
        public int Id { get; set; }
        public string ApprovedServiceName { get; set; }
        public float ApprovedEstimatedTime { get; set; }
        public float ApprovedCostGross { get; set; }
        public float WorkedTime { get; set; }
        // Foreign keys
        public int OrderId { get; set; }
        public int ServiceId { get; set; }
        public Order Order { get; set; }
        public Service Service { get; set; }
    }
}