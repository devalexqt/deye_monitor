#!/bin/bash
set -e
echo "========================= WORKING ==================="
echo "-->bundle python in to to single executable...."

TMP_DIR=$(mktemp -d)

# bun build ./server.js --compile --outfile $TMP_DIR/server
cd python
source env_deye/bin/activate
pyinstaller --onefile --add-data="../inverters.json:." --clean read_inverters_data.py

echo "Start to uploading release to gh..."
gh release upload --repo https://github.com/devalexqt/deye_monitor.git --clobber www ./dist/read_inverters_data
rm -fR $TMP_DIR

echo "======================== DONE! ======================="