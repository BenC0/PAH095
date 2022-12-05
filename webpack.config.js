const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const build_folder = "./src/"
const production_folder = "./prod/"

const config = {
	entry: {
		control: `${build_folder}control.js`,
		variation_1: `${build_folder}variation_1.js`
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, production_folder)
	},
	mode: 'production',
	devtool: false,
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			  })
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'svg-inline-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([production_folder])
		//new BundleAnalyzerPlugin()
	]
};

module.exports = config;