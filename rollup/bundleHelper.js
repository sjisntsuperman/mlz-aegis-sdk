import deepmerge from 'deepmerge';
import {
  makeTsPlugin,
  makeTerserPlugin,
  makeVisulizePlugin,
  makeCleanUpPlugin,
  makeStripPlugin,
  makeCommonJsPlugin,
  makeResolvePlugin,
  makeJsonPlugin,
  makeSizePlugin,
} from './plugins/index.js';

export function makeBaseBundleConfig(options) {
  const { entries, bundleTypes = 'standalone' } = options;

  // iief
  const standAloneConfig = {
    output: {
      format: 'iife',
      name: 'Aegis',
    },
    context: 'window',
  };
  // cjs
  const nodeBundleConfig = {
    output: {
      format: 'cjs',
    },
  };

  const sharedBundleConfig = {
    input: entries,
    output: {
      // a file extension will be added to this base value when we specify either a minified or non-minified build
      // entryFileNames: outputFileBase,
      dir: 'build',
      sourcemap: true,
      strict: false,
      esModule: false,
    },
    plugins: [
      makeTsPlugin(),
      makeTerserPlugin(),
      makeVisulizePlugin(),
      makeCleanUpPlugin(),
      makeStripPlugin(),
      makeCommonJsPlugin(),
      makeResolvePlugin(),
      makeJsonPlugin(),
      makeSizePlugin(),
    ],
    treeshake: 'smallest',
  };

  const bundleTypeConfigMaps = {
    standalone: standAloneConfig,
    node: nodeBundleConfig,
  };

  return deepmerge.all([sharedBundleConfig, bundleTypeConfigMaps[bundleTypes]]);
}

// need?
export function makeBaseBundleVariants(baseConfig) {
  return null;
}
