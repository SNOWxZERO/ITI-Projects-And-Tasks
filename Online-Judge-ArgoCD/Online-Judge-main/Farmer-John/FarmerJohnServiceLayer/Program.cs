using System.Text;
using FarmerJohnBusinessLayer;
using FarmerJohnBusinessLayer.AuthHandler;
using FarmerJohnBusinessLayer.Handlers;
using FarmerJohnDataAccessLayer;
using FarmerJohnDataAccessLayer.DAOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:8080") // your Vite dev server
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddDbContext<FramerJohnDbContext>();
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddTransient<IUserDao, UserDao>();
builder.Services.AddTransient<IProblemsDao, ProblemDao>();
builder.Services.AddTransient<ISubmissionDao, SubmissionDao>();
builder.Services.AddTransient<ITestCasesDao, TestCasesDao>();
builder.Services.AddTransient<ITestCaseVerdictsDao, TestCaseVerdictsDao>();
builder.Services.AddScoped<IAuthServiceHandler, AuthServiceHandler>();
builder.Services.AddScoped<IProblemsListHandler, ProblemListHandler>();
builder.Services.AddScoped<ICreateProblemHandler, CreateProblemHandler>();
builder.Services.AddScoped<ISubmissionHandler, SubmissionHandler>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FarmerJohnDataAccessLayer.FramerJohnDbContext>();
    try
    {
        if (db.Database.CanConnect())
            Console.WriteLine("✅ Successfully connected to MySQL database!");
        else
            Console.WriteLine("❌ Could not connect to the database.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ Database connection failed: " + ex.Message);
    }
}


app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();