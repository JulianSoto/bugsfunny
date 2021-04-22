const fs = require('fs/promises');
const path = require('path');
const simpleGit = require('simple-git/promise');
const asTable = require('as-table');

const git = simpleGit();

module.exports = async () => {
  const issuesDirectory = path.join(
    await git.revparse('--show-toplevel'),
    '.bugsfunny'
  );
  const files = await fs.readdir(issuesDirectory);
  const issues = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(issuesDirectory, file));
      const parsedContent = JSON.parse(content);
      return { file, ...parsedContent };
    })
  );

  console.log(asTable(issues));
};
