#!/bin/bash

npm run build

cd dist

for file in $(find . -type f -regex '.*\.\(html\|js\|css\)$'); do
  echo "Compressing file: $file"
  brotli -q 11 -f $file
done


