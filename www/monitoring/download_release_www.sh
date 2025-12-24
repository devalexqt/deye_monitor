#!/bin/bash
cd /opt/production
rm -fR www/
set -e

echo "Starting to download www release ..."
gh release download --repo https://github.com/devalexqt/deye_monitor.git --clobber www  --dir ./www -p "www.tar.gz"
echo "Extracting www folder..."
#rm -fR www/
cd www
tar -xzvf www.tar.gz -C ./
rm -f www.tar.gz
echo "Restarting webserver..."
systemctl restart webserver
echo "============================== DONE! ====================================\n"