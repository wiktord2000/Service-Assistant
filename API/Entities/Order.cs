using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{   
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string OrderNumber { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public DateTime? DeadlineDate { get; set; }
        public string ClientDescription { get; set; }
        public string RepairDescription { get; set; }
        public string InvoiceId { get; set; }
        public int? Mileage { get; set; }
        public float? TotalJobsNet { get; set; }
        public float? TotalJobsGross { get; set; }
        public float? TotalPartsNet { get; set; }
        public float? TotalPartsGross { get; set; }
        public float? TotalNet { get; set; }
        public float? TotalGross { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? FinishDate { get; set; }

        // -------------------- Foreign keys
        public int AppUserId { get; set; }
        public int StatusId { get; set; }
        public int? ClientId { get; set; }      // Change to int cause cascade deletion but I think is better to stay int? 
                                                // because we will be able to check all orders even if corresopnding car or client was deleted
        public int? VehicleId { get; set; }
        public AppUser AppUser { get; set; }
        public Status Status { get; set; }
        public Client Client { get; set; }
        public Vehicle Vehicle { get; set; }
        
    }
}