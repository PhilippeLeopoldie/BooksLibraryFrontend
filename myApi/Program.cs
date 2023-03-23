using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<myApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("booklibraryConnectionString") ?? throw new InvalidOperationException("Connection string 'myApiContext' not found.")));


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

    

var app = builder.Build();
 app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwaggerUI();
    app.UseCors(opt =>{
        opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

    } );
}
if (app.Environment.IsProduction())
{

    app.UseSwaggerUI();
    app.UseCors(opt =>{
        opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

    } );
}
app.UseCors(opt =>{
        opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

    } );

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
