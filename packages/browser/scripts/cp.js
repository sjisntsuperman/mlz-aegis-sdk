const fs = require('fs');
const path = require('path');

const pwd = process.cwd();

function getBundleDirectory() {
  const buildDirectory = path.join(pwd, './build');
  return buildDirectory;
}

async function cpBundleFile() {
  const directoryPath = getBundleDirectory();
  const sourceFile = path.join(directoryPath, './index.js');
  const targetDirectory = path.join(pwd, './example');

  const targetFile = path.join(targetDirectory, 'bundle.js');
  let isExisted = fs.existsSync(targetFile);

  if (isExisted) {
    await fs.rmSync(targetFile);
  }

  const targetStream = fs.createWriteStream(targetFile);
  const sourceStream = fs.createReadStream(sourceFile);

  sourceStream.on('data', data => {
    targetStream.write(data);
  });

  sourceStream.on('end', () => {
    targetStream.end();
  });
}

cpBundleFile();
