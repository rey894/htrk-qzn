# Optimize Logo Intro.mov for web loading screen
# Requires ffmpeg. Run: .\scripts\optimize-loading-video.ps1

$src = "src/assets/Logo Intro.mov"
$dst = "src/assets/Logo-Intro.mp4"

if (-not (Test-Path $src)) {
  Write-Error "Source not found: $src"
  exit 1
}

ffmpeg -y -i $src -t 5 `
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" `
  -c:v libx264 -crf 28 -preset medium -movflags +faststart -an `
  $dst

if ($LASTEXITCODE -eq 0) {
  $size = (Get-Item $dst).Length / 1KB
  Write-Host "Created $dst ($([math]::Round($size, 1)) KB)"
}
