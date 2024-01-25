#!/usr/bin/env bash

set -euo pipefail

readarray -d '' files < <(fd --regex ".*\{js|css|html|txt|ico|svg|xml|json|webmanifest}" --full-path ./dist --print0)

for file in "${files[@]}"
do
  ouch compress "$file" "$file.gz"
  ouch compress --format zst "$file" "$file.zstd"
  # ouch can't do brotli encoding so far
  #  ouch compress "$file" "$file.br"
  #  https://github.com/ouch-org/ouch/issues/604
  brotli "$file" -o "$file.br"
done
