import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dns from 'dns';
// https://vitejs.dev/config/

dns.setDefaultResultOrder('ipv4first');

//@ts-ignore
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	process.env = { ...process.env, ...env };

	// const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
	// 	return {
	// 		...prev,
	// 		['process.env.' + key]: `"${val}"`
	// 	};
	// });

	return defineConfig({
		plugins: [vue()],
		base: '/',
		build: {
			outDir: process.env.VITE_OUTDIR,
			rollupOptions: {
				output: {
					format: 'esm'
				}
			}
		},
		// server: {
		// 	hmr: {
		// 		port: 3000
		// 	}
		// },
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, './src/components'),
				'@composables': path.resolve(__dirname, './src/composables'),
				'@models': path.resolve(__dirname, './src/models'),
				'@router': path.resolve(__dirname, './src/router'),
				'@services': path.resolve(__dirname, './src/services'),
				'@store': path.resolve(__dirname, './src/store'),
				'@styles': path.resolve(__dirname, './src/styles'),
				'@views': path.resolve(__dirname, './src/router/views'),
				'@utils': path.resolve(__dirname, './src/utils')
			}
		}
		// define: envWithProcessPrefix
	});
};
