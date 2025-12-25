#!/bin/bash
systemctl stop deye_charger.service
set -e
cd /opt/production

echo "Starting to download python reader release ..."
gh release download --repo https://github.com/devalexqt/deye_monitor.git --clobber www  --dir . -p "charger_writer"
chmod a+x read_inverters_data
echo "Restarting deye_charger.service..."
systemctl restart deye_charger.service
echo "============================== DONE! ====================================\n"