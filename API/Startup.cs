using System.Text;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // Dependency injection container! This method gets called by the runtime. Use this method to add services to the container.
        // Add here every service to be aveliable in any part of our app!!! Auto create and delete...
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices(_config);  // -> ApplicationServiceExtensions (TokenService, DataContext)
            services.AddControllers();
            services.AddCors(); // Add cors 1.
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            // Setup Authentication 
            services.AddIdentityServices(_config);   // -> IdentityServiceExtensions (Authentication)
        }

        // Here you can configure incoming request (make some operations at them). Configure how the app deal with requests.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {   
            // Delete when create middleware
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            //     app.UseSwagger();
            //     app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            // }
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();
            // Add cors 2.  - allow frontend to retrive data from api
            app.UseCors( x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));      // The position is important - don't change place

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
