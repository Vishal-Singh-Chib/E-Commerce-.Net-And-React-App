using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] // https://localhost:5000/api/products
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private static StoreContext context;
        public ProductsController(StoreContext objcontext) 
        { 
           context = objcontext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return   await context.Products.ToListAsync(); 
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Product>> GetProduct(int Id)
        {
            var product = await context.Products.FindAsync(Id);
            if(product == null) { return NotFound(); }
            return product;
        }
    }
}
