# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy everything to the container
COPY . ./

# Restore the dependencies
RUN dotnet restore

# Publish the application in Release mode to the out directory
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published files from the build container
COPY --from=build-env /app/out .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5001
ENV ASPNETCORE_ENVIRONMENT=Development

# Expose port 5000
EXPOSE 5001

# Entry point to run the application
ENTRYPOINT ["dotnet", "EeveePlushAPI.dll"]
