const fs = require('fs').promises;
const path = require('path');
const simpleGit = require('simple-git/promise');
const generateIssueFilename = require('./generateIssueFilename');

module.exports = async (data) => {
  const git = simpleGit({
    baseDir: process.cwd(),
  });
  const gitDirectory = await git.revparse('--show-toplevel');
  const fileName = generateIssueFilename(data.title || '');
  const jsonStringData = JSON.stringify(data, null, 2);
  const filePath = path.join(gitDirectory, '.bugsfunny', fileName);

  await fs.mkdir(path.join(gitDirectory, '.bugsfunny'), { recursive: true });
  await fs.writeFile(filePath, jsonStringData);

  return fileName;
};
