# PowerShell deployment script for cPanel
# This script builds the project and prepares files for upload

param(
    [switch]$Staging = $false,
    [switch]$Subdirectory = $false
)

Write-Host "=== Quezon Bukidnon Website Deployment ===" -ForegroundColor Cyan
Write-Host ""

if ($Subdirectory) {
    Write-Host "Building for SUBDIRECTORY deployment (e.g., /staging/)..." -ForegroundColor Yellow
    npm run build:staging
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed! Please check errors above." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Copying .htaccess for subdirectory..." -ForegroundColor Cyan
    Copy-Item -Path "public\.htaccess.staging" -Destination "dist-staging\.htaccess" -Force
    
    $distFolder = "dist-staging"
    $deployPath = "public_html/staging/"
    $accessUrl = "https://quezonbukidnon.com/staging/"
}
else {
    Write-Host "Building for ROOT/SUBDOMAIN deployment..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed! Please check errors above." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Copying .htaccess file to dist..." -ForegroundColor Cyan
    Copy-Item -Path "public\.htaccess" -Destination "dist\.htaccess" -Force
    
    $distFolder = "dist"
    if ($Staging) {
        $deployPath = "public_html/staging/" # or staging.quezonbukidnon.com Document Root
        $accessUrl = "https://staging.quezonbukidnon.com"
    }
    else {
        $deployPath = "public_html/"
        $accessUrl = "https://quezonbukidnon.com"
    }
}

if (Test-Path "$distFolder\.htaccess") {
    Write-Host ".htaccess copied successfully!" -ForegroundColor Green
}
else {
    Write-Host "Warning: .htaccess not found or copy failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "=== DEPLOYMENT INSTRUCTIONS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Upload Location:" -ForegroundColor Yellow
Write-Host "  Folder: $distFolder" -ForegroundColor White
Write-Host "  Destination: $deployPath" -ForegroundColor White
Write-Host ""
Write-Host "Steps:" -ForegroundColor Yellow
Write-Host "  1. Log in to cPanel" -ForegroundColor White
Write-Host "  2. Open File Manager" -ForegroundColor White
Write-Host "  3. Navigate to: $deployPath" -ForegroundColor White
Write-Host "  4. Upload ALL contents from '$distFolder' folder" -ForegroundColor White
Write-Host "  5. Ensure .htaccess is in the root (same directory as index.html)" -ForegroundColor White
Write-Host "  6. Set file permissions: files=644, folders=755" -ForegroundColor White
Write-Host "  7. Test at: $accessUrl" -ForegroundColor White
Write-Host ""

if (-not $Subdirectory -and $Staging) {
    Write-Host "=== IMPORTANT: DNS SETUP REQUIRED ===" -ForegroundColor Red
    Write-Host ""
    Write-Host "If you see 'DNS_PROBE_FINISHED_NXDOMAIN' error:" -ForegroundColor Yellow
    Write-Host "  1. Create subdomain 'staging' in cPanel (Domains > Subdomains)" -ForegroundColor White
    Write-Host "  2. Wait 15-30 minutes for DNS propagation" -ForegroundColor White
    Write-Host "  3. Install SSL certificate for the subdomain" -ForegroundColor White
    Write-Host "  4. See DNS_SETUP_GUIDE.md for detailed instructions" -ForegroundColor White
    Write-Host ""
}

Write-Host "For subdirectory deployment, use: .\scripts\deploy.ps1 -Subdirectory" -ForegroundColor Gray
Write-Host "For staging subdomain, use: .\scripts\deploy.ps1 -Staging" -ForegroundColor Gray
