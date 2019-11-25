intern.registerLoader(() => {
  return paths => {
    return Promise.all(paths.map(path => import(path)));
  };
});
