module.exports = function formatPath (dirPath) {
  if (dirPath.slice(-1) === '/') {
    return formatPath(dirPath.slice(0, -1))
  }

  return dirPath
}
