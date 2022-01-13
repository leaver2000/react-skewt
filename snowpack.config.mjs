/** @type {import("snowpack").SnowpackUserConfig } */
process.env.SNOWPACK_PUBLIC_API_URL = 'http://localhost:5000/api';
export default {
	mount: { public: { url: '/', static: true }, src: '/' },
	packageOptions: {
		/* env: { API_URL: 'http://localhost:5000/api' }, */
		knownEntrypoints: ['react-is', '@mui/base', '@mui/base/composeClasses'],
	},
	alias: {
		lib: './src/lib',
		hooks: './src/hooks',
		components: './src/components',
		controller: './src/controller',
		routes: './src/routes',
		SVGGElements: './src/lib/SVGElements',
	},
	plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-webpack'],
	routes: [
		{
			match: 'routes',
			src: '.*',
			dest: '/index.html',
		},
	],
};
