#!/usr/bin/env bash
#
# Encodes every master video in a folder into web renditions plus poster frames.
#
#   ./scripts/encode-videos.sh src/assets/_originals/academy-videos academy
#
# Requires ffmpeg:  sudo apt install ffmpeg
#
# Why these settings, given the site is self-hosted on shared cPanel:
#   -crf 27        quality-targeted, so calm footage costs less than busy
#                  footage instead of paying a flat bitrate. Phone masters here
#                  arrive at 23-27 Mbps, which is ~10x more than the web needs.
#   -r 30          the masters are 60fps; halving it roughly halves the bitrate
#                  and nobody misses it on a short clip in a web page.
#   short edge 720 portrait clips become 720x1280, landscape 1280x720, so both
#                  orientations get the same visual quality per pixel.
#   +faststart     moves the moov atom to the front, so playback can begin
#                  before the whole file has arrived.
#   yuv420p        the pixel format phones and Safari will actually decode.
#
set -euo pipefail

SRC_DIR="${1:-src/assets/_originals/academy-videos}"
NAME="${2:-academy}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/media/video/$NAME"

command -v ffmpeg >/dev/null || { echo "ffmpeg not found: sudo apt install ffmpeg" >&2; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe not found: sudo apt install ffmpeg" >&2; exit 1; }
mkdir -p "$OUT"

shopt -s nullglob nocaseglob
FILES=("$SRC_DIR"/*.{mp4,mov,m4v})
[ ${#FILES[@]} -gt 0 ] || { echo "no videos in $SRC_DIR" >&2; exit 1; }

for SRC in "${FILES[@]}"; do
  # Slugified the same way scripts/optimize-images.mjs does, so photo and video
  # ids stay consistent: lowercase, and every run of non-alphanumerics becomes a
  # single dash (underscores included — IMG_0142 -> img-0142).
  BASE=$(basename "${SRC%.*}" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')

  W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$SRC")
  H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$SRC")

  # Scale the SHORT edge to 720 and let the long edge follow, rounded to even
  # (H.264 requires even dimensions). -2 does that rounding for us.
  if [ "$H" -ge "$W" ]; then SCALE="720:-2"; else SCALE="-2:720"; fi

  echo "→ $BASE (${W}x${H})"
  ffmpeg -loglevel error -stats -y -i "$SRC" \
    -vf "scale=$SCALE" -r 30 \
    -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ac 2 \
    -movflags +faststart \
    "$OUT/${BASE}.mp4"

  # Poster pulled at 1s: frame zero is very often a black fade-in. Clips shorter
  # than a second fall back to the first frame.
  ffmpeg -loglevel error -y -ss 00:00:01 -i "$SRC" -frames:v 1 -q:v 3 \
    -vf "scale=$SCALE" "$OUT/${BASE}-poster.jpg" 2>/dev/null \
    || ffmpeg -loglevel error -y -i "$SRC" -frames:v 1 -q:v 3 \
         -vf "scale=$SCALE" "$OUT/${BASE}-poster.jpg"
done

echo
ls -lh "$OUT"
echo
echo "Add or update the entries in ACADEMY_VIDEOS in src/store/site.js to match."
