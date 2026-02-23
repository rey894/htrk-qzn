#!/usr/bin/env bash
set -euo pipefail

# Deploy this repo's production build to the Apache staging webroot used by
# the Cloudflare tunnel for quezon.haturiko.net (port 4273 -> Apache).

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEBROOT="${APACHE_WEBROOT:-/var/www/htrk_qzn_staging}"
DEFAULT_ENV_SOURCE="/home/haturikoquezon/gitProject/htrk-qzn2.0/htrk_qzn_staging/.env"
ENV_SOURCE="${ENV_SOURCE:-$DEFAULT_ENV_SOURCE}"
INSTALL_DEPS="${INSTALL_DEPS:-0}"

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

require_cmd npm
require_cmd sudo

if ! sudo -n true >/dev/null 2>&1; then
  echo "Passwordless sudo is required for Apache webroot deployment." >&2
  exit 1
fi

cd "$REPO_ROOT"

if [[ ! -f .env ]]; then
  if [[ -f "$ENV_SOURCE" ]]; then
    cp "$ENV_SOURCE" .env
    echo "Copied .env from $ENV_SOURCE"
  else
    echo "Missing .env and fallback env source not found: $ENV_SOURCE" >&2
    exit 1
  fi
fi

if [[ "$INSTALL_DEPS" == "1" || ! -d node_modules ]]; then
  npm ci --no-audit --no-fund
fi

npm run build

ts="$(date +%Y%m%d_%H%M%S)"
backup="${WEBROOT}.bak_${ts}"
swap_old="${WEBROOT}.swapold_${ts}"
tmp="${WEBROOT}.__new__"

if [[ ! -d "$WEBROOT" ]]; then
  echo "Apache webroot does not exist: $WEBROOT" >&2
  exit 1
fi

sudo cp -a "$WEBROOT" "$backup"

if [[ -e "$tmp" ]]; then
  sudo mv "$tmp" "${tmp}.stale_${ts}"
fi

sudo mkdir -p "$tmp"
sudo cp -a "$REPO_ROOT/dist/." "$tmp/"
sudo chown -R www-data:www-data "$tmp"

sudo mv "$WEBROOT" "$swap_old"
sudo mv "$tmp" "$WEBROOT"

echo "Deployed to $WEBROOT"
echo "Backup: $backup"
echo "Previous webroot snapshot: $swap_old"
echo "Validate:"
echo "  curl -s -H 'Host: quezon.haturiko.net' http://127.0.0.1:4273 | head"
