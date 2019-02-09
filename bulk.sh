#!/bin/bash
cat mock_input.txt | while IFS="" read -r line
do 
    node index.js <<< $line 
    echo "-----------------------"
done;