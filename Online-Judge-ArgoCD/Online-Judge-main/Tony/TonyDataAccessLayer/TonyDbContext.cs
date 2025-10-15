using Microsoft.EntityFrameworkCore;
using TonyDataAccessLayer.Models;

namespace TonyDataAccessLayer;

public class TonyDbContext : DbContext{
    protected override void OnConfiguring(DbContextOptionsBuilder options){
        var connectionString = "server=localhost;user=root;password=mysqldatabase123;database=OJT";
        var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));
        options.UseMySql(connectionString, serverVersion);
    }

    public DbSet<SubmissionModel> Submissions{ get; set; }
}