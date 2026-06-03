using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projetos.Endpoints
{
    public record GetProjectsResponse(
        Guid Id,
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );

    public class GetProjectsHandler(AppDbContext db)
    {
        public async Task<List<GetProjectsResponse>> Handle()
        {
            return await db.Projects
                .Select(p => new GetProjectsResponse(
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