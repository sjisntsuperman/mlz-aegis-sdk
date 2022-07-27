import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export function makeTsPlugin(jsVersion) {
  const plugin = typescript({
    tsconfig: 'tsconfig.json',
    clean: true,
    tsconfigOverride: {
      compilerOptions: {
        target: jsVersion,
      },
    },
  });
  plugin.name = 'typescript';
  return plugin;
}

export function makeTerserPlugin() {
  const plugin = terser();
  return plugin;
}

export { resolve as makeNodeResolvePlugin };
export { commonjs as makeCommonJSPlugin };
