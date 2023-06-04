const {minify} = require("terser");
const fs = require("fs");

const lib = require("./src/lib");
const src = require("./src");

// Combine scripts in ./src/lib/
const lib_scripts = Object.values(lib).join('');

const html_template = fs.readFileSync("index.html", { encoding: "utf8"});
const anchor = html_template.match(/[\s]*<a .*?href="#placeholder"[^>]*><\/a>/)?.[0];
if (anchor == null) {
  console.log("Could not find placeholder anchor tag.");
  return;
}
const [html_start, html_end] = html_template.split(anchor);

(async () => {
  let options = {
    mangle: {
      toplevel: true,
    },
    compress: {
      passes: 2
    }
  };

  // Generate bookmarklet link for each item in ./src/
  let result = "";
  for (const key in src) {
    const script = `(() => {${lib_scripts}${src[key]}})();`;
    const bookmarklet = (await minify(script, options)).code.replace(/%|"|<|>|\n/g, encodeURIComponent);
    result += anchor.replace("#placeholder", `javascript: ${bookmarklet}`).replace("><", `>${key} Template<`);
  }
  const date = `<!-- Generated at ${Date()} -->`;

  fs.mkdirSync("public", {recursive: true});
  fs.writeFileSync("public/index.html", html_start + result + html_end + date);
})();
