// https://stackoverflow.com/a/33583377/1113225
// Treat falsey values in template literals as empty string
// i.e. `undefined` becomes "" instead of the default "undefined"
function nonEmpty(parts) {
  var res = parts[0];
  for (var i=1; i<parts.length; i++) {
    if (arguments[i]) res += arguments[i];
    res += parts[i];
  }
  return res;
}
