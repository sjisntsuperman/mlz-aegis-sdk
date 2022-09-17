import deepMerge from 'deepmerge';
import {
  makeTsPlugin,
  makeTerserPlugin,
  // makeVisulizePlugin,
  // makeCleanUpPlugin,
  makeStripPlugin,
  makeCommonJsPlugin,
  makeResolvePlugin,
  makeJsonPlugin,
  makeSizePlugin,
} from './plugins/index.js';

const BUNDLE_VARIANTS = ['.js', '.min.js', '.debug.min.js'];

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
      // makeCleanUpPlugin(),
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

  return deepMerge.all([sharedBundleConfig, bundleTypeConfigMaps[bundleTypes]]);
}

// need?
export function makeBundleConfigVariants(baseConfig, options = {}) {
  const { variants = BUNDLE_VARIANTS } = options;

  const terserPlugin = makeTerserPlugin();

  // The additional options to use for each variant we're going to create.
  const variantSpecificConfigMap = {
    '.js': {},

    '.min.js': {
      plugins: [terserPlugin],
    },

    '.debug.min.js': {
      plugins: [terserPlugin],
    },
  };

  return variants.map(variant => {
    if (!BUNDLE_VARIANTS.includes(variant)) {
      throw new Error(`Unknown bundle variant requested: ${variant}`);
    }
    return deepMerge(baseConfig, variantSpecificConfigMap[variant]);
  });
}
