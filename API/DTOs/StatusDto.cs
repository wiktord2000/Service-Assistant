using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class StatusDto
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Name { get; set; }
        public bool? Finished { get; set; }
        public bool? IsPaid { get; set; }
        public bool? HasInvoice { get; set; }
        public bool? EmailSend { get; set; }
    }
}