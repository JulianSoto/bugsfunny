let assert = require('assert');
const generateIssueFilename = require('../src/generateIssueFilename');

describe('Filname generator', function () {
  const filename = generateIssueFilename('  abcd  -#&%_ 1234   ');

  it('should trim and remove non-alphanumeric and space characters from name', function () {
    assert.ok(filename.startsWith('abcd---1234' + '-'));
  });

  it('should return filename ending with .json', function () {
    assert.ok(filename.endsWith('.json'));
  });
});
