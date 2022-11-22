using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.ServiceDtos
{   

    // Note: If we want to make any numeral field required we have to mark it using [Required] directive and append type via question mark -> ?
    // Otherwise It doesn't work. With string it isn't required. 
    public class ServiceCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public float? CostNet { get; set; }
        [Required]
        public float? CostGross { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        public float? EstimatedTime { get; set; }
        [Required]
        public float? TotalNet { get; set; }
        [Required]
        public float? TotalGross { get; set; }
    }
}