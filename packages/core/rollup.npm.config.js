import { makeBaseNpmConfig, makeBaseNpmVariants } from '../../rollup';

export default makeBaseNpmVariants(
  makeBaseNpmConfig({
    entry: ['index.ts'],
  }),
);
