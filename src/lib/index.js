// Export all files in this dir as strings when require()'d

const fs = require("fs");
const scripts = fs
  .readdirSync(__dirname)
  .filter(file => file !== "lib")
  .filter(file => file !== "index.js")
  .map(filename => filename.replace(".js", ""));

module.exports = {};
scripts.forEach(script => {
  module.exports[script] = fs.readFileSync(`${__dirname}/${script}.js`, "utf8");
});
