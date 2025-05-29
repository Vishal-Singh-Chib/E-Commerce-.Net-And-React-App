using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-Request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("Not good request");
        }

        [HttpGet("unAuthorized")]
        public IActionResult GetUnAuthorized()
        {
            return Unauthorized("UnAuthorized request");
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Prob1", "error1");
            ModelState.AddModelError("Prob2", "error2");
            return ValidationProblem("validation error");
        }
    }
}
