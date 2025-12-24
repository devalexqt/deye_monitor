#!/bin/bash
systemctl stop webserver
set -e
cd /opt/production

echo "Starting to download webserver release ..."
gh release download --repo https://github.com/devalexqt/deye_monitor.git --clobber www  --dir . -p "server"
chmod a+x server
echo "Restarting webserver..."
systemctl restart webserver
echo "============================== DONE! ====================================\n"