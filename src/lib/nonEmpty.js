// https://stackoverflow.com/a/33583377/1113225
// Treat falsey values in template literals as empty string
// i.e. `undefined` becomes "" instead of the default "undefined"
const nonEmpty = (parts, ...expr) => {
  let res = "";

  for (let i=0; i<parts.length; i++) {
    // Append string part
    res += parts[i];

    // Check if we want to skip expression part
    if (!expr[i]) continue;
    if (Array.isArray(expr[i])) continue;

    // Append expression part
    res += expr[i];
  }

  return res;
};
