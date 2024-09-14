import path from 'path';

export default {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(mp3|wav|ogg)$/,
			use: {
				loader: 'file-loader',
				options: {
					outputPath: 'static/audio',
					publicPath: '/_next/static/audio',
					name: '[name].[hash].[ext]',
				},
			},
		});

		return config;
	},
};