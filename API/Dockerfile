# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0.400 AS build
WORKDIR /src

# Install dotnet-ef CLI tool compatible with .NET 7
RUN dotnet tool install --global dotnet-ef --version 7.0.14
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy project file and restore
COPY ["API/API.csproj", "API/"]
WORKDIR /src/API
RUN dotnet restore "API.csproj"

# Copy all source files
COPY . .

# Run EF migrations
RUN dotnet ef database update

# Publish application
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0.10 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]
