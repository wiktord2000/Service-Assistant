using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ClientUpdateDto
    {
        public string CompanyName { get; set; }
        public string Nip { get; set; }
        [Required(ErrorMessage = "Imię jest wymagana")]
        public string Firstname { get; set; }
        [Required(ErrorMessage = "Nazwisko jest wymagana")]
        public string Lastname { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}