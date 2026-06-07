using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Projects.Shared;

namespace VitrineAPI.Features.Projetos.Endpoints
{
    public class GetProjectByIdHandler(AppDbContext db)
    {
        public async Task<ProjectsResponse?> Handle(Guid id)
        {
            return await db.Projects
                .Where(p => p.Id == id)
                .Select(p => new ProjectsResponse(
                    p.Id,
                    p.Title,
                    p.Category,
                    p.Description,
                    p.ImageUrl
                ))
                .FirstOrDefaultAsync();
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class GetProjectByIdController(GetProjectByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetProjectById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}