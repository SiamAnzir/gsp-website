#!/usr/bin/env bash
#
# Encodes a master video into the web renditions the site expects, plus a poster
# frame, and drops them straight into public/media/video/.
#
#   ./scripts/encode-video.sh ~/Downloads/academy-master.mov academy
#
# Requires ffmpeg:  sudo apt install ffmpeg
#
# Why these settings, given the site is self-hosted on shared cPanel:
#   -crf 26 / 28   quality-targeted rather than bitrate-targeted, so calm footage
#                  costs less than busy footage instead of paying a flat rate
#   -movflags +faststart  moves the moov atom to the front; without it a browser
#                  must buffer a large chunk before the first frame appears
#   -preset slow   spends encode time once, here, to save bandwidth on every view
#   -pix_fmt yuv420p  the profile phones and Safari will actually decode
#
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: $0 <master-video> [output-basename]" >&2
  exit 1
fi

SRC="$1"
NAME="${2:-$(basename "${SRC%.*}" | tr '[:upper:] ' '[:lower:]-')}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media/video"

command -v ffmpeg >/dev/null || { echo "ffmpeg not found: sudo apt install ffmpeg" >&2; exit 1; }
mkdir -p "$OUT"

echo "→ 720p (the rendition most visitors will get)"
ffmpeg -loglevel error -stats -y -i "$SRC" \
  -vf "scale=-2:720" \
  -c:v libx264 -preset slow -crf 28 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 128k -ac 2 \
  -movflags +faststart \
  "$OUT/${NAME}-720.mp4"

echo "→ 1080p"
ffmpeg -loglevel error -stats -y -i "$SRC" \
  -vf "scale=-2:1080" \
  -c:v libx264 -preset slow -crf 26 -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 128k -ac 2 \
  -movflags +faststart \
  "$OUT/${NAME}-1080.mp4"

# Poster is pulled at 1s: frame zero is very often a black fade-in.
echo "→ poster frame"
ffmpeg -loglevel error -y -ss 00:00:01 -i "$SRC" -frames:v 1 -q:v 3 \
  -vf "scale=-2:720" "$OUT/${NAME}-poster.jpg"

echo
ls -lh "$OUT/${NAME}"*
echo
echo "If 720p came out over ~6 MB, the clip is too long — trim it rather than"
echo "raising the CRF. Length costs more than quality settings do."
