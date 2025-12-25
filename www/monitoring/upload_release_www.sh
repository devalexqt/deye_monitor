#!/bin/bash
set -e
echo "========================= WORKING ==================="
npm run build
echo "-->creating www archive..."


TMP_DIR=$(mktemp -d)
tar -czvf $TMP_DIR/www.tar.gz  -C dist .

echo "Start to uploading release to gh..."
gh release upload --repo https://github.com/devalexqt/deye_monitor.git --clobber www $TMP_DIR/www.tar.gz
ls -lh $TMP_DIR
rm -fR $TMP_DIR

#extract to test files
#tar -xzf $TMP_DIR/www.tar.gz -C ./www2
#ls -lh $TMP_DIR
echo "======================== DONE! ======================="