using TonyBusinessLayer.Handlers;
using TonyDataAccessLayer;
using TonyDataAccessLayer.DAOs;
using TonyInfrastructureLayer.Handlers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TonyDbContext>();
builder.Services.AddHealthChecks();
builder.Services.AddControllers();
builder.Services.AddTransient<ISubmitDao, SubmitDao>();
builder.Services.AddScoped<IWorker, Worker>();
builder.Services.AddScoped<ISubmitHandler, SubmitHandler>();

var app = builder.Build();

app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();