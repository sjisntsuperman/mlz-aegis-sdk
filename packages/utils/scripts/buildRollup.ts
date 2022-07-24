import * as fs from 'fs';
import * as childProcess from 'child_process';

function run(cmd, ...options) {
  return childProcess.exec(cmd, ...options);
}

run('yarn rollup -c rollup.npm.config.js');
