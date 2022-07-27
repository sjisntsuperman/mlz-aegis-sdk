import { makeBaseBundleConfig, makeBundleConfigVariants } from '../../rollup.config.js';

export default makeBaseBundleConfig(makeBundleConfigVariants({ entry: ['src/index.ts'] }));
