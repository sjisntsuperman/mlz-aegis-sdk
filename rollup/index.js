const merge = require('deepmerge');

export function makeNpmConfig(options) {
  const { entry } = options;
  const defaultConfig = {
    entry,
    output: {},
  };
  const pluginConfig = {};

  return merge(defaultConfig, pluginConfig);
}

export function getPlugins() {
  const plugins = ['typescript', 'terser', ''];
  const o = {};
  // Object.keys(plugins).forEach(key => {
  //     o[key] =
  // })
  return o;
}
