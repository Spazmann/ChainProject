using Microsoft.Extensions.Options;
using Steeltoe.Discovery.Client;
using Steeltoe.Discovery.Eureka;


var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MessageAPIDatabaseSettings>(
    builder.Configuration.GetSection("MessageAPIDatabaseSettings"));

builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IOptions<MessageAPIDatabaseSettings>>().Value);

builder.Services.AddSingleton<UserService>();

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
