using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database.Models;

namespace VitrineAPI.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<WorkDone> WorksDone { get; set; } = null!;
    }
}
