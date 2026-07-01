using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using VitrineAPI.Database;
using VitrineAPI.Features.Projects.Endpoints;
using VitrineAPI.Features.Teachers.Endpoints;
using VitrineAPI.Features.WorksDone.Endpoints;

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
            
            // Projects handlers
            builder.Services.AddScoped<CreateProjectHandler>();
            builder.Services.AddScoped<GetProjectsHandler>();
            builder.Services.AddScoped<GetProjectByIdHandler>();
            builder.Services.AddScoped<UpdateProjectHandler>();
            builder.Services.AddScoped<DeleteProjectHandler>();

            // WorksDone handlers
            builder.Services.AddScoped<CreateWorkDoneHandler>();
            builder.Services.AddScoped<GetWorkDoneByIdHandler>();
            builder.Services.AddScoped<GetWorksDoneByProjectIdHandler>();
            builder.Services.AddScoped<DeleteWorkDoneHandler>();
            builder.Services.AddScoped<UpdateWorkDoneHandler>();

            // Teachers handlers
            builder.Services.AddScoped<CreateTeacherHandler>();
            builder.Services.AddScoped<GetTeachersHandler>();
            builder.Services.AddScoped<GetTeacherByIdHandler>();

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

            app.UseCors(FrontendCorsPolicy);

            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseCors("FrontEnd");

            app.MapControllers();

            app.Run();
        }
    }
}
