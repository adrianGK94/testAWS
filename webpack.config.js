require("babel-register");

module.exports = {
	mode: 'development',
	entry: ['./app/index.js'],
	output: {
		path: __dirname + '/build',
		filename: 'deep-payments.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader?name=/[name].[ext]']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader?name=/[name].[ext]']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		],
	},
	resolve: {
		extensions: ['.js']
	},
	devServer: {
		port: 3000,
		contentBase: __dirname + '/build',
		inline: true,
		headers: {
			"Access-Control-Allow-Origin": "http://localhost:3000",
		},
		compress: true,
		public: 'store-client-nestroia1.c9users.io',
	},
	optimization: {
		splitChunks: {
		  chunks: 'async',
		  minSize: 30000,
		  maxSize: 0,
		  minChunks: 1,
		  maxAsyncRequests: 5,
		  maxInitialRequests: 3,
		  automaticNameDelimiter: '~',
		  name: true,
		  cacheGroups: {
			vendors: {
			  test: /[\\/]node_modules[\\/]/,
			  priority: -10
			},
			default: {
			  minChunks: 2,
			  priority: -20,
			  reuseExistingChunk: true
			}
		  }
		}
	}
};
