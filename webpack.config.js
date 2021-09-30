import path from "path";
import crypto from "crypto";
import HtmlPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin as CleanPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin";
import webpack from "webpack";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const PATH_SRC = path.resolve("src");
const PATH_DIST = path.resolve("dist");

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (env, argv) => {
  const devMode = argv.mode === "development";

  return {
    mode: argv.mode,

    target: "web",

    ...(devMode ? { devtool: "source-map" } : {}),

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".mjs", ".json"],
    },

    entry: {
      app: path.resolve(PATH_SRC, "index.tsx"),
    },

    output: {
      filename: devMode ? "[name].js" : "[name].[contenthash:8].js",
      path: PATH_DIST,
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: PATH_SRC,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          include: PATH_SRC,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  exportLocalsConvention: "camelCase",
                  localIdentName: devMode
                    ? "[name]-[contenthash:8]"
                    : "[contenthash:8]",
                },
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(ogg|mp3|svg|png)$/,
          include: PATH_SRC,
          type: "asset/resource",
          generator: {
            filename: devMode ? "[name][ext]" : "[name].[hash:8][ext]",
          },
        },
        {
          test: /\.png$/,
          include: path.resolve(PATH_SRC, "assets/favicon"),
          type: "asset/resource",
          generator: {
            filename: devMode
              ? "favicon.[name][ext]"
              : "favicon.[name].[hash:8][ext]",
          },
        },
        {
          test: /\.webmanifest$/,
          include: PATH_SRC,
          generator: {
            filename: devMode ? "[name][ext]" : "[name].[hash:8][ext]",
          },
          use: [
            {
              loader: path.resolve("./lib/webmanifest-loader"),
            },
          ],
          type: "asset/resource",
        },
      ],
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      ...(devMode
        ? []
        : [
            new CompressionWebpackPlugin({
              filename: "[name][ext].gz[query]",
              algorithm: "gzip",
              test: /\.(js|css|html|svg|json|webmanifest)$/,
              minRatio: 0.8,
            }),
            new CompressionWebpackPlugin({
              filename: "[name][ext].br[query]",
              algorithm: "brotliCompress",
              test: /\.(js|css|html|svg|json|webmanifest)$/,
              compressionOptions: {
                level: 11,
              },
              minRatio: 0.8,
            }),
            // new BundleAnalyzerPlugin(),
          ]),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash:8].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash:8].css",
      }),
      new HtmlPlugin({
        template: path.resolve(PATH_SRC, "index.html"),
      }),
      ...(devMode
        ? []
        : [
            new webpack.DefinePlugin({
              SW_VERSION: JSON.stringify(
                crypto.randomBytes(16).toString("hex")
              ),
            }),
            new InjectManifest({
              swSrc: "./src/sw.js",
              exclude: [/^favicon\./, /\.map$/, /\.LICENSE\.txt$/],
            }),
          ]),
      new CleanPlugin(),
    ],

    devServer: {
      host: "0.0.0.0",
      historyApiFallback: true,
      hot: true,
    },
  };
};
