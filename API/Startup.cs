using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        private IWebHostEnvironment CurrentEnvironment{ get; set; } 
        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            CurrentEnvironment = env;
        }


        // Dependency injection container! This method gets called by the runtime. Use this method to add services to the container.
        // Add here every service to be aveliable in any part of our app!!! Auto create and delete...
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices(_config);  // -> ApplicationServiceExtensions (TokenService, DataContext)
            // Hosting purposes
            var connectionString = "";
            if (CurrentEnvironment.IsDevelopment()){
                connectionString = _config.GetConnectionString("DefaultConnection");
            }
            else{
                // Parse connection URL to connection string for Npgsql
                var connectionURL = Environment.GetEnvironmentVariable("DATABASE_URL");
                connectionURL = connectionURL.Replace("postgres://", string.Empty);
                var pgUserPass = connectionURL.Split("@")[0];
                var pgHostPortDb = connectionURL.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];
                var updatedHost = pgHost.Replace("flycast", "internal");
                connectionString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
            }
            services.AddDbContext<DataContext>(options => {
                options.UseNpgsql(connectionString);
                // options.EnableSensitiveDataLogging();
            });
            services.AddControllers().AddNewtonsoftJson();      // .AddNewtonsoftJson(); added to PATCH perpose
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
        public void Configure(IApplicationBuilder app)
        {
            if (CurrentEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

            app.UseMiddleware<ExceptionMiddleware>();

            // app.UseHttpsRedirection();

            app.UseRouting();
            // Add cors 2.  - allow frontend to retrive data from api
            app.UseCors(x => x.WithOrigins("http://localhost:4200")
                            .AllowAnyMethod()
                            .AllowAnyHeader());      // The position is important - don't change place

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
