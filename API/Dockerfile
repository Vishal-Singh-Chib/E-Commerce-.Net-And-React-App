# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0.400 AS build
WORKDIR /src

# Install dotnet-ef CLI tool
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy CSPROJ and restore
COPY ["API/API.csproj", "API/"]
WORKDIR /src/API
RUN dotnet restore "API.csproj"

# Copy everything and build
COPY . .

# Run migration
RUN dotnet ef database update

# Publish the application
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0.10 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]
