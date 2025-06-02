# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0.400 AS build
WORKDIR /src

# Copy only the csproj file first for faster restores
COPY ["API/API.csproj", "API/"]

# Restore dependencies
WORKDIR /src/API
RUN dotnet restore

# Copy everything else
COPY . .

# Publish the application to /app/publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0.10 AS final
WORKDIR /app

# Copy the build output
COPY --from=build /app/publish .

# Start the application
ENTRYPOINT ["dotnet", "API.dll"]
