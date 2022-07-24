import commonjs from '@rollup/plugin-commonjs';
import deepMerge from 'deepmerge';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { ModuleDetectionKind } from 'typescript';

export function makeTsPlugin() {
  const plugin = typescript({
    tsconfig: '../../tsconfig.json',
    clean: true,
  });
  plugin.name = 'typescript';
  return plugin;
}

export function makeTerserPlugin() {
  const plugin = {};
  return plugin;
}

export function makeNodeResolvePlugin() {
  const plugin = {};
  return plugin;
}
