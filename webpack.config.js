
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    Script: "./assets/js/Script.js",
  },
  output: {
    path: path.resolve(__dirname, "/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
};