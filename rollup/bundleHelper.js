import deepMerge from 'deepmerge';
import { makeTSPlugin, makeNodeResolvePlugin, makeCommonJSPlugin, makeTerserPlugin } from './plugins';

import { mergePlugins } from './utils';

const BUNDLE_VARIANTS = ['.js', '.min.js', '.debug.min.js'];

export function makeBaseBundleConfig(options) {
  const { entrypoints, jsVersion, outputFileBase, packageSpecificConfig } = options;

  const nodeResolvePlugin = makeNodeResolvePlugin();
  const tsPlugin = makeTSPlugin(jsVersion.toLowerCase());
  const commonJSPlugin = makeCommonJSPlugin({ transformMixedEsModules: true });

  const sharedBundleConfig = {
    input: entrypoints,
    output: {
      entryFileNames: outputFileBase,
      dir: 'build',
      sourcemap: true,
      strict: false,
      esModule: false,
    },
    plugins: jsVersion === 'es5' ? [tsPlugin, nodeResolvePlugin] : [nodeResolvePlugin, commonJSPlugin],
    treeshake: 'smallest',
  };

  return deepMerge.all([sharedBundleConfig, packageSpecificConfig || {}], {
    customMerge: key => (key === 'plugins' ? mergePlugins : undefined),
  });
}

export function makeBundleConfigVariants(baseConfig, options = {}) {
  const { variants = BUNDLE_VARIANTS } = options;
  const terserPlugin = makeTerserPlugin();

  return variants.map(variant => {
    if (!BUNDLE_VARIANTS.includes(variant)) {
      throw new Error(`Unknown bundle variant requested: ${variant}`);
    }
    return deepMerge(baseConfig, {
      plugins: [terserPlugin],
      customMerge: key => (key === 'plugins' ? mergePlugins : undefined),
    });
  });
}
