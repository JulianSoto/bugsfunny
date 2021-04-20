const fs = require('fs').promises;
const path = require('path');
const generateIssueFilename = require('./generateIssueFilename');

module.exports = async (data) => {
  const fileName = generateIssueFilename(data.title || '');
  const jsonStringData = JSON.stringify(data, null, 2);
  const filePath = path.join(process.cwd(), '.bugsfunny', fileName);

  await fs.mkdir(path.join(process.cwd(), '.bugsfunny'), { recursive: true });
  await fs.writeFile(filePath, jsonStringData);

  return fileName;
};
