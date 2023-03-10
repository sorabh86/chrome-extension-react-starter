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
	entry:{
		popup: path.resolve('src/popup/popup.tsx'),
		options: path.resolve('src/options/options.tsx'),
		background: path.resolve('src/background/background.ts'),
		contentScript: path.resolve('src/contentscript/contentScript.ts'),
	},
	module: {
		rules:[
			{
				use: 'ts-loader',
				test: /\.(ts|tsx)?$/,
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

