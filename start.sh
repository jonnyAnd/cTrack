#!/bin/bash


#save a copy for later as a backup
DATE_STR=$(date +%F)

wget -O ./backupData/$DATE_STR.json https://www.bbc.co.uk/indepthtoolkit/data-sets/coronavirus_lookup/json



#Do the node stuff
node .