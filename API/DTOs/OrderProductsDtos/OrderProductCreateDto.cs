using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.OrderProductsDtos
{
    public class OrderProductCreateDto
    {
        [Required]
        public string ApprovedProductName { get; set; }
        public int ApprovedSalesPriceGross { get; set; }
        public int Count { get; set; }
        public bool IsProvided { get; set; } = false;
        public bool IsReserved { get; set; } = false;
        public DateTime? DeliveryTime { get; set; }
        // Foreign keys
        [Required]
        public int? OrderId { get; set; }
        [Required]
        public int? ProductId { get; set; }
    }
}