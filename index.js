const bookmarklet = require("bookmarklet");
const fs = require("fs");

const lib = require("./src/lib");
const src = require("./src");

// Combine scripts in ./src/lib/
let libScripts = "";
Object.keys(lib).forEach(key => {
  libScripts += lib[key];
});

// Generate bookmarklet for each item in ./src/
Object.keys(src).forEach(key => {
  const script = `${libScripts} ${src[key]}`;
  const option = {};
  const result = bookmarklet.convert(script, option);

  const path = `./dist/${key}.js`;
  fs.writeFileSync(path, result);
});
