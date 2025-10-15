# Use the ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Expose HTTP (80) and HTTPS (443) ports inside the container
EXPOSE 80
EXPOSE 443

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup --no-create-home appuser

# Copy the published output directly into /app
COPY deployment_package/ ./

# Copy HTTPS certificate (ensure this exists locally)
COPY https/devcert.pfx /https/devcert.pfx

# Set permissions
RUN mkdir -p /https \
    && chown -R appuser:appgroup /https \
    && chmod 644 /https/devcert.pfx

# Environment variables for HTTPS
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="1234"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/devcert.pfx

# Optional: ensure Production mode
ENV ASPNETCORE_ENVIRONMENT=Production

# Switch to non-root user
USER appuser

# Start the application
ENTRYPOINT ["dotnet", "FarmerJohnServiceLayer.dll"]
