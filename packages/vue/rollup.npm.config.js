import { makeBaseNpmConfig, makeBaseNpmVariants } from '../../rollup/index.js';

export default makeBaseNpmVariants(
  makeBaseNpmConfig({
    bundleTypes: 'standalone',
    entries: ['src/index.ts'],
  }),
);
