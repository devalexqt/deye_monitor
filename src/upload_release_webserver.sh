#!/bin/bash
set -e
echo "========================= WORKING ==================="
echo "-->bundle nodejs file to single executable...."

TMP_DIR=$(mktemp -d)

bun build ./server.js --compile --outfile $TMP_DIR/server

echo "Start to uploading release to gh..."
gh release upload --repo https://github.com/devalexqt/deye_monitor.git --clobber www $TMP_DIR/server
rm -fR $TMP_DIR

echo "======================== DONE! ======================="