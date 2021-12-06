const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: "index.html",
        },
    },
};
