#!/bin/bash
systemctl stop deye_reader.service
set -e
cd /opt/production

echo "Starting to download python reader release ..."
gh release download --repo https://github.com/devalexqt/deye_monitor.git --clobber www  --dir . -p "read_inverters_data"
chmod a+x read_inverters_data
echo "Restarting deye_reader.service..."
systemctl restart deye_reader.service
echo "============================== DONE! ====================================\n"