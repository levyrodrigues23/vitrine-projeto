using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.WorksDone.Shared;

namespace VitrineAPI.Features.WorksDone.Endpoints;

public class GetWorksDoneByProjectIdHandler(AppDbContext db)
{
    public async Task<List<WorkDoneResponse>> Handle(Guid projectId)
    {
        return await db.WorksDone
            .AsNoTracking()
            .Where(w => w.ProjectId == projectId)
            .Select(w => new WorkDoneResponse(
                w.Id,
                w.Title,
                w.Category,
                w.Description,
                w.ImageUrl,
                w.ProjectId))
            .ToListAsync();
    }
}

[ApiController]
[Route("api/projects/{projectId:guid}/worksdone")]
public class GetWorksDoneByProjectIdController(GetWorksDoneByProjectIdHandler handler) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get(Guid projectId)
    {
        var result = await handler.Handle(projectId);
        return Ok(result);
    }
}