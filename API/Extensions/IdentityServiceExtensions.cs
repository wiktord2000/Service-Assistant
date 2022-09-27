
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config){

            // Important! We have to add in Nuget:  Microsoft.AspNetCore.Authentication.JwtBearer
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                                .AddJwtBearer(options => {
                                    options.TokenValidationParameters = new TokenValidationParameters{
                                        ValidateIssuerSigningKey = true,
                                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                                        ValidateIssuer = false,    // Issuer - api, Audience - angular
                                        ValidateAudience = false
                                    };
                                });
                                
            return services;
        }
    }
}