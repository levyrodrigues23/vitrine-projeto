using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Projetos.Endpoints
{
    public record GetProjectByIdResponse(
        Guid Id,
        string Title,
        ProjectCategory Category,
        string Description,
        string ImageUrl
    );

    public class GetProjectByIdHandler(AppDbContext db)
    {
        public async Task<GetProjectByIdResponse?> Handle(Guid id)
        {
            return await db.Projects
                .Where(p => p.Id == id)
                .Select(p => new GetProjectByIdResponse(
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