using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.StatisticsDtos
{
    public class ClientOrdersStatistics
    {
        public int ClientId { get; set; }
        public int OrdersCount { get; set; }
    }
}