import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import size from 'rollup-plugin-sizes';
import { visualizer } from 'rollup-plugin-visualizer';
import strip from '@rollup/plugin-strip';

export function makeTsPlugin() {
  const baseTSPluginOptions = {
    tsconfig: 'tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        declarationMap: false,
        paths: {
          '@aegis/browser': ['../browser/src'],
          '@aegis/core': ['../core/src'],
          '@aegis/types': ['../types/src'],
          '@aegis/utils': ['../utils/src'],
        },
        baseUrl: '.',
      },
    },
    include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
    clean: true,
  };

  const plugin = typescript(baseTSPluginOptions);

  return plugin;
}

export function makeVisulizePlugin() {
  const baseVisulizeOptions = {
    title: '@aegis/visulize',
    filename: '@aegis/visulize.html',
  };

  const plugin = visualizer(baseVisulizeOptions);

  return plugin;
}

export function makeCleanUpPlugin() {
  return cleanup({
    comments: 'none',
  });
}

export function makeStripPlugin() {
  return strip({
    include: ['**/*.(js|ts|tsx)'],
    functions: ['console.log'],
  });
}

export {
  resolve as makeResolvePlugin,
  commonjs as makeCommonJsPlugin,
  terser as makeTerserPlugin,
  json as makeJsonPlugin,
  size as makeSizePlugin,
};
