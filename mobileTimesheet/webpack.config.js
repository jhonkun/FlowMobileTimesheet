var path = require('path');

module.exports = {
	context: path.resolve('source/app/'), // source folder
	entry: './main.js', // entry file inside the source folder
	output: {
		path: path.resolve('www/assets/'), // dist files folder
		publicPath: 'assets/', // match src of <script> tag
		filename: 'scripts.js' // dist file
	},

	// dir served by webpack-dev-server
	devServer: { contentBase: 'www' },

	module: {
		loaders: [
			/*	scripts */ {
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'ng-annotate!babel?presets[]=es2015'
			},
			/*	sass */ {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: 'style!css!autoprefixer!sass'
			},
			/*	css */ {
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style!css!autoprefixer'
			},
			/*	images & fonts */ {
				test: /\.(png|jpg|ttf|eot|svg|woff|woff2)$/,
				exclude: /node_modules/,
				loader: 'url?limit=10000'
			},
			/*	templates */ {
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'raw'
			}
		]
	}
};
