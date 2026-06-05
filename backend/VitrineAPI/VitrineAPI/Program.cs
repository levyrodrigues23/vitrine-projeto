using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using VitrineAPI.Database;
using VitrineAPI.Features.Projects.Endpoints;
using VitrineAPI.Features.Projetos.Endpoints;

namespace VitrineAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            const string FrontendCorsPolicy = "FrontendCorsPolicy";

            builder.Services
                .AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(FrontendCorsPolicy, policy =>
                {
                    policy
                        .WithOrigins(
                            "http://localhost:5173",
                            "http://127.0.0.1:5173",
                            "http://localhost:5174",
                            "http://127.0.0.1:5174"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<CreateProjectHandler>();
            builder.Services.AddScoped<GetProjectsHandler>();
            builder.Services.AddScoped<GetProjectByIdHandler>();
            builder.Services.AddScoped<UpdateProjectHandler>();
            builder.Services.AddScoped<DeleteProjectHandler>();

            Directory.CreateDirectory(Path.Combine(builder.Environment.ContentRootPath, "wwwroot"));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors(FrontendCorsPolicy);

            app.UseStaticFiles();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
