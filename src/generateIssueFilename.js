module.exports = (filename = '') => {
  const randomString = Math.floor(Math.random() * 2 ** 32).toString(16);

  if (!filename) {
    return randomString;
  }
  return (
    filename
      .trim()
      .replace(/ +/g, '-')
      .replace(/[^0-9a-z-]/gi, '') +
    '-' +
    randomString +
    '.json'
  );
};
