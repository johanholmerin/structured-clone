const requireEsm = require("esm")(module);

intern.registerLoader(() => {
  return paths => {
    paths.forEach(path => requireEsm(path));
  };
});
