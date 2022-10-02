using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public IHostEnvironment _env { get; }
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }


        public async Task InvokeAsync(HttpContext context){     // HttpContext - all the structure of request e.g. headers, body...
            
            try{
                await _next(context);      // track the request handling and catch errors if needed
            }
            catch(Exception ex)            // catch error and obtain its details (trace)
            {
                _logger.LogError(ex, ex.Message);  // log in console
                context.Response.ContentType = "application/json";

                // build response                
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                // We've imorted the IHostEnv to obtain current env (e.g. development mode)
                var response = _env.IsDevelopment()
                    ? new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())  // attach error trace in rresponse
                    : new ApiExceptions(context.Response.StatusCode, "Internal Server Error");  // if not development 

                // we want to json format (with some updates - camelCase)
                var options = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}