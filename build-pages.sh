#!/usr/bin/env bash
rm -rf public/
mkdir -p public
cp index.html public/index.html
sed -i "s/#banner/$(cat dist/banner.js)/" public/index.html
sed -i "s/#character/$(cat dist/character.js)/" public/index.html
sed -i "s/#weapon/$(cat dist/weapon.js)/" public/index.html
sed -i "s/#date/$(date)/" public/index.html
