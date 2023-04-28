using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
var booklibraryConnectionString = builder.Configuration["ConnectionStrings:myApiContext"];
builder.Services.AddDbContext<myApiContext>(options =>
    //options.UseSqlServer(builder.Configuration.GetConnectionString(booklibraryConnectionString!) ?? throw new InvalidOperationException("Connection string 'myApiContext' not found.")));
    //options.UseSqlServer(builder.Configuration.GetConnectionString("myApiContext") ?? throw new InvalidOperationException("Connection string 'myApiContext' not found.")));
    options.UseInMemoryDatabase(databaseName:"MyInMemoryDatabase"));
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwaggerUI();
  app.UseCors(opt => 
  {
    opt.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
  });
}
if (app.Environment.IsProduction())
{
  app.UseSwaggerUI();

}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
