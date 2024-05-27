using Microsoft.Extensions.Options;
using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MessageAPIDatabaseSettings>(
    builder.Configuration.GetSection("MessageAPIDatabaseSettings"));

builder.Services.Configure<ChannelAPIDatabaseSettings>(
    builder.Configuration.GetSection("ChannelAPIDatabaseSettings"));

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<MessageAPIDatabaseSettings>>().Value);

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<ChannelAPIDatabaseSettings>>().Value);

builder.Services.AddSingleton<MessageService>();
builder.Services.AddSingleton<ChannelService>();

builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration.GetValue<string>("ChannelAPIDatabaseSettings:ConnectionString")));

builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDiscoveryClient(builder.Configuration);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3002",
        builder => builder
            .WithOrigins("http://localhost:3002")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use the CORS policy
app.UseCors("AllowLocalhost3002");

app.UseAuthorization();

app.MapControllers();

try
{
    app.Run();
}
catch (Exception ex)
{
    // Log the exception and rethrow
    Console.WriteLine($"Unhandled exception: {ex.Message}");
    Console.WriteLine(ex.StackTrace);
    throw;
}
