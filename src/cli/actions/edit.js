const fs = require('fs/promises');
const path = require('path');
const getIssuesDirectory = require('../../getIssuesDirectory');

module.exports = async (issueFile, options) => {
  const issueFilename = path.join(await getIssuesDirectory(), issueFile);
  const fileData = await fs.readFile(issueFilename);
  const issue = JSON.parse(fileData);
  const messages = [];

  if (options.description) {
    issue.description = options.description;
    messages.push(`- Description`);
  }

  if (options.assignedTo) {
    const previousAssignee = issue.assignedTo;
    issue.assignedTo = options.assignedTo;
    messages.push(`- Assignee: '${previousAssignee}' -> '${issue.assignedTo}'`);
  }

  if (options.status) {
    const previousStatus = issue.status;
    issue.status = options.status;
    messages.push(`- Status: '${previousStatus}' -> '${options.status}'`);
  }

  // does not check if label already exists in array
  if (options.addLabel) {
    issue.labels.push(options.addLabel);
    messages.push(`- Label:  +'${options.addLabel}'`);
  }

  if (options.removeLabel) {
    const labelIndex = issue.labels.indexOf(options.removeLabel);
    if (labelIndex >= 0) {
      issue.labels.splice(labelIndex, 1);
      messages.push(`- Label:  -'${options.removeLabel}'`);
    }
  }

  await fs.writeFile(issueFilename, JSON.stringify(issue, null, 2));

  if (messages.length > 0) {
    console.log(`The following fields of '${issueFile}' have been changed:`);
    messages.forEach((m) => console.log(m));
  } else {
    console.log('No field has been changed');
  }
};
