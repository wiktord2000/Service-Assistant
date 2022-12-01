using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using AutoMapper;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace API.Controllers
{
    [Authorize]
    public class MailController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MailController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> SendMail(DTOs.MailDto mailData)
        {   
            
            InternetAddressList listOfAddresses = new InternetAddressList();
            foreach (string address in mailData.Emails)
            {
                listOfAddresses.Add(MailboxAddress.Parse(address));
            }
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("serviceassistantpl@gmail.com"));
            email.To.AddRange(listOfAddresses);
            email.Subject = mailData.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html){ Text = mailData.Message};

            using var smtp = new SmtpClient();
            try{
                await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync("serviceassistantpl@gmail.com", "trrjszezesgaxrdz");
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
                return Ok();
            }
            catch{
                return StatusCode(StatusCodes.Status400BadRequest, "Problem z wysłaniem wiadomości!");
            }
        }
    }
}