const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode:'development',
	devtool:'cheap-module-source-map', // removed the eval output
	entry:{
		popup: path.resolve('src/popup/popup.tsx')
	},
	module: {
		rules:[
			{
				use: 'ts-loader',
				test: /\.tsx?$/,
				exclude: /node_modules/,
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns:[
				{
					from:path.resolve('public'), 
					to:path.resolve('dist')
				}
			]
		}),
		new HtmlWebpackPlugin({
			title: 'Chrome Extension Popup Starter',
			filename: 'popup.html',
			chunks: ['popup']
		})
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path:path.resolve('dist'),
	}
}