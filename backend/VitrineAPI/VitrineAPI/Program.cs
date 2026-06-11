using FluentValidation;
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

            builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("FrontEnd", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseStaticFiles();

            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseAuthorization();

            app.UseCors("FrontEnd");

            app.MapControllers();

            app.Run();
        }
    }
}
