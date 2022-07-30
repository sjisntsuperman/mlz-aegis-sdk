import { builtinModules } from 'module';
import * as path from 'path';

import deepMerge from 'deepmerge';

import {
  makeConstToVarPlugin,
  makeNodeResolvePlugin,
  makeRemoveBlankLinesPlugin,
  makeRemoveESLintCommentsPlugin,
} from './plugins/index.js';
import { mergePlugins } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageDotJSON = require(path.resolve(process.cwd(), './package.json'));

export function makeBaseNPMConfig(options = {}) {
  const {
    entrypoints = ['src/index.ts'],
    esModuleInterop = false,
    hasBundles = false,
    packageSpecificConfig = {},
  } = options;

  const nodeResolvePlugin = makeNodeResolvePlugin();
  const constToVarPlugin = makeConstToVarPlugin();
  const removeESLintCommentsPlugin = makeRemoveESLintCommentsPlugin();
  const removeBlankLinesPlugin = makeRemoveBlankLinesPlugin();

  const defaultBaseConfig = {
    input: entrypoints,

    output: {
      dir: hasBundles ? 'build/npm' : 'build',

      sourcemap: true,

      preserveModules: true,

      generatedCode: 'es2015',

      strict: false,

      externalLiveBindings: false,

      freeze: false,

      interop: esModuleInterop ? 'auto' : 'esModule',
    },

    plugins: [nodeResolvePlugin, constToVarPlugin, removeESLintCommentsPlugin, removeBlankLinesPlugin],

    external: [
      ...builtinModules,
      ...Object.keys(packageDotJSON.dependencies || {}),
      ...Object.keys(packageDotJSON.devDependencies || {}),
      ...Object.keys(packageDotJSON.peerDependencies || {}),
    ],

    treeshake: false,
  };

  return deepMerge(defaultBaseConfig, packageSpecificConfig, {
    customMerge: key => (key === 'plugins' ? mergePlugins : undefined),
  });
}

export function makeNPMConfigVariants(baseConfig) {
  const variantSpecificConfigs = [
    { output: { format: 'cjs', dir: path.join(baseConfig.output.dir, 'cjs') } },
    { output: { format: 'esm', dir: path.join(baseConfig.output.dir, 'esm') } },
  ];

  return variantSpecificConfigs.map(variant => deepMerge(baseConfig, variant));
}
