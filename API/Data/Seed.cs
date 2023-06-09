using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedData
    {
        // Use camelCase instead of PascalCase
        public static JsonSerializerOptions jsonOptions = new JsonSerializerOptions{ 
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                Converters = { new CustomDateTimeConverter()}
            };

        public static async Task DeploySeedData(DataContext context){
            await SeedUsers(context);
            await SeedClients(context);
            await SeedStatuses(context);
            await SeedVehicles(context);
            await SeedProducts(context);
            await SeedServices(context);
            await SeedOrders(context);
            await SeedOrderProducts(context);
            await SeedOrderServices(context);
        }

        public static async Task SeedUsers(DataContext context){
            if(await context.Users.AnyAsync()) return; 

            var usersData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/UsersSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(usersData, jsonOptions);

            foreach(var user in users){
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("qweqweqwe"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedClients(DataContext context){
            if(await context.Clients.AnyAsync()) return; 

            var clientsData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/ClientsSeedData.json");
            var clients = JsonSerializer.Deserialize<List<Client>>(clientsData, jsonOptions);
            
            foreach(var client in clients){
                context.Clients.Add(client);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedVehicles(DataContext context){
            if(await context.Vehicles.AnyAsync()) return; 

            var vehiclesData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/VehiclesSeedData.json");
            var vehicles = JsonSerializer.Deserialize<List<Vehicle>>(vehiclesData, jsonOptions);
            
            foreach(var vehicle in vehicles){
                context.Vehicles.Add(vehicle);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedServices(DataContext context){
            if(await context.Services.AnyAsync()) return; 

            var servicesData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/ServicesSeedData.json");
            var services = JsonSerializer.Deserialize<List<Service>>(servicesData, jsonOptions);
            
            foreach(var service in services){
                context.Services.Add(service);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedProducts(DataContext context){
            if(await context.Products.AnyAsync()) return; 

            var productsData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/ProductsSeedData.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productsData, jsonOptions);
            
            foreach(var product in products){
                context.Products.Add(product);
            }

            await context.SaveChangesAsync();
        }


        public static async Task SeedStatuses(DataContext context){
            if(await context.Statuses.AnyAsync()) return; 

            var statusesData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/StatusesSeedData.json");
            var statuses = JsonSerializer.Deserialize<List<Status>>(statusesData, jsonOptions);
            
            foreach(var status in statuses){
                context.Statuses.Add(status);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedOrders(DataContext context){
            if(await context.Orders.AnyAsync()) return; 

            var ordersData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/OrdersSeedData.json");
            var orders = JsonSerializer.Deserialize<List<Order>>(ordersData, jsonOptions);
            
            foreach(var order in orders){
                context.Orders.Add(order);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedOrderServices(DataContext context){
            if(await context.OrderServices.AnyAsync()) return; 

            var orderServicesData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/OrderServicesSeedData.json");
            var orderServices = JsonSerializer.Deserialize<List<OrderService>>(orderServicesData, jsonOptions);
            
            foreach(var orderService in orderServices){
                context.OrderServices.Add(orderService);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedOrderProducts(DataContext context){
            if(await context.OrderProducts.AnyAsync()) return; 

            var orderProductsData = await System.IO.File.ReadAllTextAsync("./Data/JsonData/OrderProductsSeedData.json");
            var orderProducts = JsonSerializer.Deserialize<List<OrderProduct>>(orderProductsData, jsonOptions);
            
            foreach(var orderProduct in orderProducts){
                context.OrderProducts.Add(orderProduct);
            }

            await context.SaveChangesAsync();
        }

    }

}