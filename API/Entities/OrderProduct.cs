using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class OrderProduct
    {
        public int Id { get; set; }
        [Required]
        public string ApprovedProductName { get; set; }
        public float ApprovedSalesPriceGross { get; set; }
        public int Count { get; set; }
        public bool IsProvided { get; set; } = false;
        public bool IsReserved { get; set; } = false;
        public DateTime? DeliveryTime { get; set; }
        // Foreign keys
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}