var path = require('path');
module.exports = {
	entry: './src/RollingPaper.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [{
			test: /.js$/,
			include: path.resolve(__dirname, 'src'),
			exclude: /(node_modules|build)/,
			use: 'babel-loader',
		}],
	},
	externals: {
		'react': 'commonjs react',
	},
};