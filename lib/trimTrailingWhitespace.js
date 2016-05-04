module.exports = function (str) {
  // Match trailing spaces and tabs
  const trailingWhitespaceRegex = /[ \t]+$/gm;

  return str.replace(trailingWhitespaceRegex, '');
};
