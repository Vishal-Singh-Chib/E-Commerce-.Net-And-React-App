using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<List<Product>> GetProducts()
        {
            return context.Products.ToList(); 
        }

        [HttpGet("{Id}")]
        public ActionResult<Product> GetProduct(int Id)
        {
            var product = context.Products.Find(Id);
            if(product == null) { return NotFound(); }
            return product;
        }
    }
}
