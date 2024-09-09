const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const entry = {
   front: {
      content: "./src/Front.jsx",
   },
   admin: {
      content: "./src/Admin.jsx",
   },
   login: {
      content: "./src/Login/Context.jsx",
   },
};

const build = {
   front: "public/bundle/front",
   admin: "public/bundle/admin",
   login: "public/bundle/login",
};

module.exports = (env) => {
   return {
      plugins: [
         new TerserPlugin(),
         new CleanWebpackPlugin(),
         new webpack.ProgressPlugin(),
         new webpack.HotModuleReplacementPlugin(),
         new WebpackManifestPlugin(entry[env.PAGE]),
         new HtmlWebpackPlugin(),
      ],
      entry: entry[env.PAGE],
      output: {
         path: path.resolve(__dirname, build[env.PAGE]),
         filename: env.NODE_ENV === "development" ? "[name].js" : "[name].[hash].js",
      },
      devServer: {
         port: 8081,
         historyApiFallback: true,
         proxy: {
            "/vendor.js": {
               target: "http://localhost:8080",
               secure: false,
               changeOrigin: true,
            },
         },
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
         },
      },
      resolve: {
         extensions: [".js", ".jsx"],
         alias: {
            Root: path.resolve(__dirname, "src"),
            Front: path.resolve(__dirname, "src/Front"),
            Admin: path.resolve(__dirname, "src/Admin"),
         },
      },
      optimization: {
         runtimeChunk: "single",
         splitChunks: {
            chunks: "async",
            cacheGroups: {
               defaultVendors: {
                  test: /[\\/]node_modules[\\/]/,
                  name: "vendor",
               },
            },
         },
      },
      module: {
         rules: [
            {
               test: /\.(jsx|js)$/,
               include: path.resolve(__dirname, "src/"),
               exclude: /node_modules/,
               use: [
                  {
                     loader: "babel-loader",
                     options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"],
                     },
                  },
               ],
            },
            {
               test: /\.svg$/,
               use: ["@svgr/webpack"],
            },
            {
               test: /\.css$/i,
               use: ["style-loader", "css-loader"],
            },
         ],
      },
   };
};
