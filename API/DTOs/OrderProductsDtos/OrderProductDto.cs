using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.OrderProductsDtos
{
    public class OrderProductDto
    {
        public int Id { get; set; }
        public string ApprovedProductName { get; set; }
        public float ApprovedSalesPriceGross { get; set; }
        public int Count { get; set; }
        public bool IsProvided { get; set; } = false;
        public bool IsReserved { get; set; } = false;
        public DateTime? DeliveryTime { get; set; }
        // Foreign keys
        public int OrderId { get; set; }
        public int ProductId { get; set; }
    }
}