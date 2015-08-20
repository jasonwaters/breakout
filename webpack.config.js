var webpack = require('webpack');

module.exports = {
	entry: [
		"./js/app.js"
	],
	output: {
		path: __dirname + '/dist',
		filename: "bundle.js"
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			{ test: /\.css$/, loader: "style!css" }
		]
	},
	plugins: [
	]
};
