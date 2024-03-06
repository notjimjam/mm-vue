import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import transformerDirective from '@unocss/transformer-directives';
import { presetIcons } from 'unocss';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'url';
import path from 'path';

const lengths = {
	mini: '3px',
	tiny: '5px',
	small: '8px',
	medium: '13px',
	large: '21px',
	big: '34px',
	huge: '55px',
};
const lengthNames = Object.keys(lengths).join('|');

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	
	plugins: [
		Vue({
			// see: https://vuejs.org/guide/extras/reactivity-transform.html
		}),
		
		// see: https://github.com/hannoeru/vite-plugin-pages
		Pages(),
		
		Layouts(),
		
		AutoImport({
			imports: ['vue'],
			dirs: [
				'./src/**'
			],
			vueTemplate: true,
		}),
		
		// see: https://github.com/unocss/unocss
		Unocss({
			theme: {
				lengths,
			},
			presets: [
				presetUno(),
				presetIcons(),
			],
			transformers: [
				transformerDirective(),
			],
			safelist: [],
			rules: [
				/**
				 * Padding and margin for all sides
				 *
				 * Defines:
				 *     p-mini, p-tiny, ..., p-huge
				 *     m-mini, m-tiny, ..., m-huge
				 */
				[
					new RegExp(`^(p|m)-(${lengthNames})$$`),
					([, propAbbreviation, length], {theme}) => {
						if (theme.lengths[length]) {
							const prop = propAbbreviation === 'p' ? 'padding' : 'margin';
							return {[prop]: theme.lengths[length]}
						}
					},
					{autocomplete: '(p|m)-<$lengths>',}
				],
				
				/**
				 * Padding and margin for x-axis or y-axis
				 *
				 * Defines:
				 *     p-x-mini, p-x-tiny, ..., p-x-huge
				 *     px-mini,  px-tiny,  ..., px-huge
				 *     p-y-mini, p-y-tiny, ..., p-y-huge
				 *     py-mini,  py-tiny,  ..., py-huge
				 *
				 *     m-x-mini, m-x-tiny, ..., m-x-huge
				 *     mx-mini,  mx-tiny,  ..., mx-huge
				 *     m-y-mini, m-y-tiny, ..., m-y-huge
				 *     my-mini,  my-tiny,  ..., my-huge
				 */
				[
					new RegExp(`^(p|m)-?(x|y)-(${lengthNames})$$`),
					([, propAbbreviation, axis, length], {theme}) => {
						if (theme.lengths[length]) {
							const prop = propAbbreviation === 'p' ? 'padding' : 'margin';
							const size = `var(--length-${length})`;
							switch (axis) {
								case 'x':
									return {
										[`${prop}-left`]: size,
										[`${prop}-right`]: size,
									}
								case 'y':
									return {
										[`${prop}-top`]: size,
										[`${prop}-bottom`]: size,
									}
							}
						}
					},
					{autocomplete: '(p|m)-(x|y)-<$lengths>',}
				],
				
				/**
				 * Padding and margin for top, right, bottom, and left.
				 *
				 * Defines:
				 *     p-t-mini, p-t-tiny, ..., p-t-huge
				 *     pt-mini,  pt-tiny,  ..., pt-huge
				 *
				 *     m-t-mini, m-t-tiny, ..., m-t-huge
				 *     mt-mini,  mt-tiny,  ..., mt-huge
				 *
				 *     Similarly for:
				 *         p-r-(...), pr-(...); p-b-(...), pb-(...); p-l-(...), pl-(...);
				 *         m-r-(...), mr-(...); m-b-(...), mb-(...); m-l-(...), ml-(...)
				 */
				[
					new RegExp(`^(p|m)-?(t|r|b|l)-(${lengthNames})$$`),
					([, propAbbreviation, side, length], {theme}) => {
						if (theme.lengths[length]) {
							const prop = propAbbreviation === 'p' ? 'padding' : 'margin';
							const size = `var(--length-${length})`;
							switch (side) {
								case 't':
									return {[`${prop}-top`]: size}
								case 'r':
									return {[`${prop}-right`]: size}
								case 'b':
									return {[`${prop}-bottom`]: size}
								case 'l':
									return {[`${prop}-left`]: size}
							}
						}
					},
					{autocomplete: '(p|m)-(t|r|b|l)-<$lengths>',}
				],
				
				// Scaled widths, paddings, margins, etc.
				[
					new RegExp('^~([a-z\-]+)-([0-9]+)$'),
					([, property, length], {theme}) => {
						let prop = property;
						let prop2 = null;
						// Account for shorthand
						switch (prop) {
							case 'p':
								prop = 'padding';
								break;
							case 'm':
								prop = 'margin';
								break;
							case 'pr':
							case 'p-r':
								prop = 'padding-right';
								break;
							case 'pl':
							case 'p-l':
								prop = 'padding-left';
								break;
							case 'pt':
							case 'p-t':
								prop = 'padding-top';
								break;
							case 'pb':
							case 'p-b':
								prop = 'padding-bottom';
								break;
							case 'mr':
							case 'm-r':
								prop = 'margin-right';
								break;
							case 'ml':
							case 'm-l':
								prop = 'margin-left';
								break;
							case 'mt':
							case 'm-t':
								prop = 'margin-top';
								break;
							case 'mb':
							case 'm-b':
								prop = 'margin-bottom';
								break;
							case 'px':
							case 'p-x':
								prop = 'padding-left';
								prop2 = 'padding-right';
								break;
							case 'py':
							case 'p-y':
								prop = 'padding-top';
								prop2 = 'padding-bottom';
								break;
							case 'mx':
							case 'm-x':
								prop = 'margin-left';
								prop2 = 'margin-right';
								break;
							case 'my':
							case 'm-y':
								prop = 'margin-top';
								prop2 = 'margin-bottom';
								break;
						}
						const output = {};
						output[prop] = `calc(${length}px * var(--responsive-scalar))`;
						if (prop2) {
							output[prop2] = output[prop];
						}
						return output;
					},
					{autocomplete: '~(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|*)-<length>',}
				],
				
				[
					new RegExp(`^gap-(${lengthNames})`),
					([, length], {theme}) => {
						if (theme.lengths[length]) {
							const size = `var(--length-${length})`;
							return {gap: size};
						}
					},
					{autocomplete: 'gap-<$lengths>',}
				],
				
				[
					new RegExp(`^(font-size|font)-(${lengthNames})`),
					([, prefixWhichIsUnused, length], {theme}) => {
						if (theme.lengths[length]) {
							const size = `var(--font-size-${length})`;
							return {'font-size': size};
						}
					},
					{autocomplete: 'font-size-<$lengths>',}
				],
			],
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~/': `${path.resolve(__dirname, './src')}/`,
		},
	}
})
