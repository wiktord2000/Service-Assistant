FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 8080

# Copy csproj (from our project to WORKDIR) and restore as distinct layers
# Restores the dependencies and tools of a project (inside WORKDIR).
COPY *.csproj ./
RUN dotnet restore    

# Copy everything else and build (to the WORKDIR)
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image (new one with the produced files) - lighter version (we don't need sdk tools anymore - just runtime)
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out . 
ENTRYPOINT ["dotnet", "API.dll"]