import { makeBaseNpmConfig, makeBaseNpmVariants } from '../../rollup/index.js';

export default makeBaseNpmVariants(
  makeBaseNpmConfig({
    entries: ['src/index.ts'],
  }),
);
