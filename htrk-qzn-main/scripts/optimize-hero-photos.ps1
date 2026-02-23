# Optimize Hero Section photos - Mobile and Web versions
# Mobile: 1024x576 (smaller, for phones/tablets)
# Web: 1920x1080 (full HD for desktop)
# Source: src/Hero Section Photos (Mobile/Web subfolders per page)

$ErrorActionPreference = "Continue"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$root = "Z:\DEV\01_CORE_STARTUPS\Haturiko\htrk-qzn"
$srcBase = Join-Path $root "src\Hero Section Photos"
$outDir = Join-Path $root "src\assets\hero"

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

function Optimize-Image {
  param($srcPath, $dstPath, $width, $height)
  $img = Get-ChildItem $srcPath -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|JPG|JPEG|PNG)$' } | Sort-Object Length | Select-Object -First 1
  if (-not $img) { return $null }
  $vf = "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2"
  $null = cmd /c "ffmpeg -y -i `"$($img.FullName)`" -vf `"$vf`" -frames:v 1 -q:v 4 `"$dstPath`" 2>nul"
  return (Test-Path $dstPath)
}

# Pages with Mobile + Web subfolders
$mobileWebPages = @(
  @{ page = "about"; mobileDir = "1 About Quezon\Mobile"; webDir = "1 About Quezon\Web" },
  @{ page = "governance"; mobileDir = "2 Governance\Mobile"; webDir = "2 Governance\Web" },
  @{ page = "services"; mobileDir = "3 Services\Mobile"; webDir = "3 Services\Web" }
)

foreach ($m in $mobileWebPages) {
  $mobileSrc = Join-Path $srcBase $m.mobileDir
  $webSrc = Join-Path $srcBase $m.webDir
  $mobileOut = Join-Path $outDir "hero-$($m.page)-mobile.jpg"
  $webOut = Join-Path $outDir "hero-$($m.page)-web.jpg"

  Write-Host "`n$($m.page):"
  if (Optimize-Image $mobileSrc $mobileOut 1024 576) {
    Write-Host "  Mobile: $([math]::Round((Get-Item $mobileOut).Length/1KB)) KB"
  } else { Write-Warning "  Mobile: no image found" }
  if (Optimize-Image $webSrc $webOut 1920 1080) {
    Write-Host "  Web: $([math]::Round((Get-Item $webOut).Length/1KB)) KB"
  } else { Write-Warning "  Web: no image found" }
}

# Pages without Mobile/Web split - use single image for both
$singlePages = @(
  @{ page = "investment"; srcDir = "4 Investment" },
  @{ page = "tourism"; srcDir = "5 Tourism" }
)

foreach ($m in $singlePages) {
  $srcPath = Join-Path $srcBase $m.srcDir
  $mobileOut = Join-Path $outDir "hero-$($m.page)-mobile.jpg"
  $webOut = Join-Path $outDir "hero-$($m.page)-web.jpg"

  Write-Host "`n$($m.page):"
  $img = Get-ChildItem $srcPath -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|JPG|JPEG|PNG)$' } | Sort-Object Length | Select-Object -First 1
  if ($img) {
    $null = cmd /c "ffmpeg -y -i `"$($img.FullName)`" -vf `"scale=1024:576:force_original_aspect_ratio=decrease,pad=1024:576:(ow-iw)/2:(oh-ih)/2`" -frames:v 1 -q:v 4 `"$mobileOut`" 2>nul"
    $null = cmd /c "ffmpeg -y -i `"$($img.FullName)`" -vf `"scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2`" -frames:v 1 -q:v 4 `"$webOut`" 2>nul"
    Write-Host "  Mobile: $([math]::Round((Get-Item $mobileOut).Length/1KB)) KB, Web: $([math]::Round((Get-Item $webOut).Length/1KB)) KB"
  } else { Write-Warning "  No images found" }
}

Write-Host "`nDone. Hero images in $outDir"
