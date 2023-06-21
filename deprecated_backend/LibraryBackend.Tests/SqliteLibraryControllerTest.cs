namespace LibraryBackend.Tests;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore.Infrastructure;


public class SqliteLibraryControllerTest : LibraryControllerTest, IDisposable
{
  private readonly DbConnection _connection=null!;
  public SqliteLibraryControllerTest() : base(
    new DbContextOptionsBuilder<MyLibraryContext>()
    .UseSqlite(CreateInMemoryDatabase())
    .Options
  )
  {
    _connection = RelationalOptionsExtension.Extract(ContextOptions).Connection ?? throw new ArgumentNullException(nameof(_connection));

  }
private static DbConnection CreateInMemoryDatabase()
{
   var connection = new SqliteConnection("Filename=:memory:");
  connection.Open();
  return connection;
}
 
 
  public void Dispose()=> _connection.Dispose();
}