
using System.Text.Json.Serialization;
using API.Data;
using API.Data.Repositiories;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

//// - creating ExtensionsMethods notes (4)

namespace API.Extensions
{
        //// static!
    public static class ApplicationServiceExtensions
    {
            //// static IServiceCollection!               //// (this IServiceCollection!, ...args)!
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){

            // Register custom service (Singleton - running until the app is closed, 
                                     // Scoped - running until request is finished - in controller where service was injected
                                     // Transient (przejsciowy) - running until service method is finished

            services.AddScoped<ITokenService, TokenService>();      // We create Interfaces only for the sake of testing
            services.AddScoped<IUserRepository, UserRepository>();  // Add repository

            // Attach our database
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                options.EnableSensitiveDataLogging();
            });

            // My - nested objects Include() error avoid
            services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            return services;
            //// return!
        }
    }
}