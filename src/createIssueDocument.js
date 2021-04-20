const fs = require('fs');
const path = require('path');
const generateIssueFilename = require('./generateIssueFilename');

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = generateIssueFilename(data.title || '');
      const jsonStringData = JSON.stringify(data, null, 2);
      const filePath = path.join(process.cwd(), '.bugsfunny', fileName);

      fs.mkdir(
        path.join(process.cwd(), '.bugsfunny'),
        { recursive: true },
        (err) => {
          if (err) throw err;
          fs.writeFile(filePath, jsonStringData, (err) => {
            if (err) throw err;
            resolve(fileName);
          });
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
