import * as fs from 'fs';
import child_process from 'child_process';

function run(cmd: string, options: any) {
  return child_process.exec(cmd, { ...options });
}

run('pnpm run build');

try {
  fs.symlinkSync('build/cjs', 'cjs');
} catch (e) {}

try {
  fs.symlinkSync('esm/cjs', 'esm');
} catch (e) {}
