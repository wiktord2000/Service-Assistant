using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.ProductDtos;
using API.Entities;
using API.Extensions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{   
    [Authorize]
    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProductsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {   
            var userId = User.GetUserId();    // -> Extensions

            return await _context.Products
                            .Where(product => product.AppUser.Id == userId)
                            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsSearch([FromQuery] int productsNumber, [FromQuery] string match)
        {   
            var userId = User.GetUserId();   // -> Extensions

            return await _context.Products
                    .Where(product => (product.AppUser.Id == userId 
                        && (match == null || product.Name.ToLower().Contains(match))
                        )) 
                    .Take(productsNumber)
                    .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var product = await _context.Products
                            .Where(product => product.Id == id && product.AppUserId == userId)
                            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();

            if(product == null) return NotFound("Nie znaleziono produktu o podanym id!");

            return product;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductUpdateDto product)
        {   
            var userId = User.GetUserId();    // -> Extensions

            var productToUpdate = await _context.Products.FirstOrDefaultAsync(product => product.Id == id && product.AppUserId == userId);

            if(productToUpdate == null) return NotFound($"Produkt o Id {id} nie istnieje!");

            _mapper.Map(product, productToUpdate);
            _context.Products.Update(productToUpdate);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z aktualizacją produktu!");
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductCreateDto product)
        {   
            Product newProduct = new Product();

            _mapper.Map(product, newProduct);
            newProduct.AppUserId = User.GetUserId();
            _context.Products.Add(newProduct);

            if(await _context.SaveChangesAsync() > 0) return _mapper.Map(newProduct, new ProductDto());
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z dodaniem produktu!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {   
            var userId = User.GetUserId();    // -> Extensions (obtain id of sender)

            var productToDelete = await _context.Products.FirstOrDefaultAsync(product => (product.Id == id) && product.AppUserId == userId);

            if(productToDelete == null) return NotFound($"Produkt o Id {id} nie istnieje!");

            var productOrders = await _context.OrderProducts.FirstOrDefaultAsync(order => order.ProductId == id);
            if(productOrders != null) return BadRequest($"Produkt jest powiązany ze zleceniami!");

            _context.Products.Remove(productToDelete);

            if(await _context.SaveChangesAsync() > 0) return NoContent();
            return StatusCode(StatusCodes.Status500InternalServerError, "Problem z usunięciem produktu!");
        }
    }
}