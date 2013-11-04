#!/bin/sh
BASEDIR=$(dirname $0)
cd $BASEDIR
pwd

# use: Path less-source css-destination lessfile-config-file
python ~/_tools/less-monitor.py $BASEDIR src/less examples/css less-monitor.yaml