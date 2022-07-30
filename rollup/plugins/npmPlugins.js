import regexReplace from 'rollup-plugin-re';
import replace from '@rollup/plugin-replace';
import sucrase from '@rollup/plugin-sucrase';

export function makeSucrasePlugin() {
  return sucrase({
    transforms: ['typescript', 'jsx'],
  });
}

export function makeConstToVarPlugin() {
  return replace({
    preventAssignment: true,
    values: {
      'const ': 'var ',
    },
  });
}

export function makeRemoveESLintCommentsPlugin() {
  return regexReplace({
    patterns: [
      {
        test: /\/[/*] eslint-.*\n/g,
        replace: '',
      },
    ],
  });
}

export function makeRemoveBlankLinesPlugin() {
  return regexReplace({
    patterns: [
      {
        test: /\n(\n\s*)+\n/g,
        replace: '\n\n',
      },
    ],
  });
}
