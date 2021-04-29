const fs = require('fs/promises');
const path = require('path');
const getIssuesDirectory = require('../../../getIssuesDirectory');
const generateIssueFilename = require('../../../generateIssueFilename');

module.exports = async (title, options) => {
  await fs.writeFile(
    path.join(await getIssuesDirectory(), generateIssueFilename(title)),
    JSON.stringify({ title, ...options }, null, 2)
  );
  console.log(`New issue '${title}' added`);
};
