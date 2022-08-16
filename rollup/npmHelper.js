import deepmerge from 'deepmerge';
import { builtinModules } from 'module';
import path from 'path';
import {
  makeTsPlugin,
  makeTerserPlugin,
  makeCleanUpPlugin,
  makeStripPlugin,
  makeCommonJsPlugin,
  makeResolvePlugin,
  makeJsonPlugin,
} from './plugins/index.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageDotJSON = require(path.resolve(process.cwd(), './package.json'));

export function makeBaseNpmConfig(options = {}) {
  const {
    entries = ['src/index.ts'],
    esModuleInterop = false,
    hasBundles = false,
    packageSpecificConfig = {},
  } = options;

  const defaultConfig = {
    input: entries,
    output: {
      dir: hasBundles ? 'build/dev' : 'build',
      sourcemap: true,
      generateCode: 'es2015',
      strict: false,
      freeze: false,
      interop: esModuleInterop ? 'auto' : 'esModule',
    },
    external: [
      ...builtinModules,
      ...Object.keys(packageDotJSON.devDependencies || {}),
      ...Object.keys(packageDotJSON.dependencies || {}),
    ],
    plugins: [
      makeTsPlugin(),
      makeTerserPlugin(),
      makeCleanUpPlugin(),
      makeStripPlugin(),
      makeCommonJsPlugin(),
      makeResolvePlugin(),
      makeJsonPlugin(),
    ],
    treeshake: false,
  };

  return deepmerge(defaultConfig, packageSpecificConfig);
}

export function makeBaseNpmVariants(baseConfig) {
  const variantConfigs = [
    { output: { format: 'cjs', dir: path.join(baseConfig.output.dir, 'cjs') } },
    { output: { format: 'esm', dir: path.join(baseConfig.output.dir, 'esm') } },
  ];

  return variantConfigs.map(variant => deepmerge(baseConfig, variant));
}
