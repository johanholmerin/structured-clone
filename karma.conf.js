module.exports = config => {
  config.set({
    frameworks: ["mocha", "chai"],
    files: [{ pattern: "tests/*.js", watched: false }],
    preprocessors: {
      "tests/*.js": ["rollup"]
    },
    rollupPreprocessor: {
      output: {
        format: "iife",
        sourceMap: "inline"
      }
    },
    browsers: ["Chrome", "Firefox", "Safari"],
    singleRun: true
  });
};
