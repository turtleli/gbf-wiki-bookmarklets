// https://stackoverflow.com/a/33583377/1113225
// Treat falsey values in template literals as empty string
// i.e. `undefined` becomes "" instead of the default "undefined"
function nonEmpty(parts) {
  let res = "";

  for (let i=0; i<parts.length; i++) {
    const expr = arguments[i+1];

    // Append string part
    res += parts[i];

    // Check if we want to skip expression part
    if (Array.isArray(expr)) continue;
    if (!expr) continue;
    if (expr === "undefined.png") continue;

    // Append expression part
    res += expr;
  }

  return res;
}
