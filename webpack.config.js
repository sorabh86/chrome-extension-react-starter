const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const generateHtmlPage = (chunks) => {
	return chunks.map(chunk => new HtmlWebpackPlugin({
		title: 'Chrome Extension Starter',
		filename: `${chunk}.html`,
		chunks: [chunk]
	}));
}

module.exports = {
	mode:'production',
	devtool:'cheap-module-source-map', // removed the eval output
	entry:{
		popup: path.resolve('src/popup/popup.tsx'),
		options: path.resolve('src/options/options.tsx'),
	},
	module: {
		rules:[
			{
				use: 'ts-loader',
				test: /\.tsx?$/,
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/i,
				exclude: /node_modules/,
			},
			{
				type: 'public/assets',
				test: /\.(jpg|jpeg|png|woff|woff2|eof|ttf|svg)$/,
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
		...generateHtmlPage([
			'popup', 'options'
		])
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path:path.resolve('dist'),
	},
	optimization: { // share modules between different pages
		splitChunks: {
			chunks: 'all'
		}
	}
}

