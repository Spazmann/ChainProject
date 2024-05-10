FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet restore

RUN dotnet publish -c Release -o outBuildFolder

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build-env /app/outBuildFolder .

ENV SERVER_PORT=8080 
ENV MONGO_HOST=MessageAPIServiceDBMongo 
ENV MONGO_PORT=27017 
ENV MONGO_DB=MessageDB 
ENV EUREKA_HOST=MessageEurekaRegistry

ENTRYPOINT ["dotnet", "MessageService.dll"]