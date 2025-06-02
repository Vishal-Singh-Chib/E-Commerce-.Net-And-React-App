# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0.400 AS build
WORKDIR /src

# Copy CSPROJ and restore
COPY ["API/API.csproj", "API/"]
WORKDIR /src/API
RUN dotnet restore "API.csproj"

# Copy everything and build
COPY . .

# Apply EF Core migrations to update the database
RUN dotnet ef database update

# Publish the application
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0.10 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]
