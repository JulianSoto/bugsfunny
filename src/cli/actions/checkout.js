const fs = require('fs/promises');
const path = require('path');
const getIssuesDirectory = require('../../getIssuesDirectory');

module.exports = async (issueFile) => {
  const issueFilename = path.join(await getIssuesDirectory(), issueFile);
  const fileData = await fs.readFile(issueFilename);
  const issue = JSON.parse(fileData);

  console.log('\nIssue: ', issue.title, '\n');
  console.log('Description: ', issue.description, '\n');
  console.log('Assigned to: ', issue.assignedTo, '\n');
  console.log('Status: ', issue.status, '\n');
  console.log('Labels: ', issue.labels.join(', '), '\n');
};
