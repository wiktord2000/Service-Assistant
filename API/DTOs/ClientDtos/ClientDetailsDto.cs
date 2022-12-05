using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.OrderDtos;

namespace API.DTOs
{
    public class ClientDetailsDto : ClientDto
    {
        public ICollection<VehicleDto> Vehicles { get; set; }
        public ICollection<OrderDto> Orders { get; set; }
    }
}