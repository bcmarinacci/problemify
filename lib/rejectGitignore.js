module.exports = function (input) {
  // match .git, node_modules, dist, bower_components, tem, temp, jspm_packages, .DS_Store
  const gitIgnoreRegex = /\.git|node_modules(\/|$)|dist(\/|$)|bower_components(\/|$)|temp*(\/|$)|jspm_packages(\/|$)|\.DS_Store/g;

  return !(gitIgnoreRegex.test(input));
};
