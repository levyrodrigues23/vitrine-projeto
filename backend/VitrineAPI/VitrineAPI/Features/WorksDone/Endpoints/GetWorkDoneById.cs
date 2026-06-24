using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.WorksDone.Shared;

namespace VitrineAPI.Features.WorksDone.Endpoints
{
    public class GetWorkDoneByIdHandler(AppDbContext db)
    {
        public async Task<WorkDoneResponse?> Handle(Guid id)
        {
            var workDone = await db.WorksDone.FindAsync(id);
            if (workDone is null) return null;

            return new WorkDoneResponse(
                workDone.Id,
                workDone.Title,
                workDone.Category,
                workDone.Description,
                workDone.ImageUrl,
                workDone.ProjectId
            );
        }
    }

    [ApiController]
    [Route("api/worksdone")]
    public class GetWorkDoneByIdController(GetWorkDoneByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}