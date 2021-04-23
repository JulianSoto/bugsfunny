const fs = require('fs/promises');
const path = require('path');
const simpleGit = require('simple-git/promise');
const asTable = require('as-table');

const git = simpleGit();

module.exports = async (options) => {
  const includeAllIssues = !options.open && !options.closed;

  const issuesDirectory = path.join(
    await git.revparse('--show-toplevel'),
    '.bugsfunny'
  );

  const files = await fs.readdir(issuesDirectory);

  const issues = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(path.join(issuesDirectory, file));
      const parsedContent = { file, ...JSON.parse(content) };

      switch (parsedContent.status) {
        case 'open':
          if (includeAllIssues || options.open) {
            return parsedContent;
          }
          break;
        case 'closed':
          if (includeAllIssues || options.closed) {
            return parsedContent;
          }
          break;
        default:
          return null;
      }
    })
  );

  console.log(asTable(issues.filter((i) => !!i)));
};
