using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Projects.Endpoints;

namespace VitrineAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<CreateProjectHandler>();
            builder.Services.AddScoped<GetProjectsHandler>();
            builder.Services.AddScoped<GetProjectByIdHandler>();
            builder.Services.AddScoped<UpdateProjectHandler>();
            builder.Services.AddScoped<DeleteProjectHandler>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
