const path = require('path');
const simpleGit = require('simple-git');
const git = simpleGit();

module.exports = async () => {
  return path.join(await git.revparse('--show-toplevel'), '.bugsfunny');
};
