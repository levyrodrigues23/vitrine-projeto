using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Projects.Shared;

namespace VitrineAPI.Features.Projects.Endpoints
{
    public class GetProjectsHandler(AppDbContext db)
    {
        public async Task<List<ProjectsResponse>> Handle()
        {
            return await db.Projects
                .Select(p => new ProjectsResponse(
                    p.Id,
                    p.Title,
                    p.Category,
                    p.Description,
                    p.ImageUrl
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/projects")]
    public class GetProjectsController(GetProjectsHandler handler) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}