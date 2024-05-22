using Microsoft.Extensions.Options;
using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<MessageAPIDatabaseSettings>(
    builder.Configuration.GetSection("MessageAPIDatabaseSettings"));

builder.Services.Configure<SocketIOSettings>(
    builder.Configuration.GetSection("SocketIO"));

builder.Services.Configure<ChannelAPIDatabaseSettings>(
    builder.Configuration.GetSection("ChannelAPIDatabaseSettings"));

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<MessageAPIDatabaseSettings>>().Value);

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<SocketIOSettings>>().Value);

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<ChannelAPIDatabaseSettings>>().Value);

builder.Services.AddSingleton<MessageService>();
builder.Services.AddSingleton<ChannelService>();

builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration.GetValue<string>("ChannelAPIDatabaseSettings:ConnectionString")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDiscoveryClient(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
