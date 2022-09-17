const fs = require('fs');
const path = require('path');

const pwd = process.cwd();

function getBundleDirectory() {
  let directoryPath = '';
  fs.stat(path.join(pwd, './build'), (err, stats) => {
    if (err) {
      throw new Error(err);
    }

    if (stats.isDirectory()) {
      directoryPath = path.join(pwd, './build');
    }
  });
  return directoryPath;
}

function cpBundleFile() {
  const directoryPath = getBundleDirectory();
  const filePath = path.join(directoryPath, './index.js');
  const targetPath = path.join(pwd, './example');

  const targetFile = path.join(targetPath, 'bundle.js');
  let isExisted = fs.existsSync(targetFile);

  if (isExisted) {
    fs.rmSync(targetFile);
  }

  fs.copyFile(filePath, targetPath);
  console.log('done');
}

cpBundleFile();
