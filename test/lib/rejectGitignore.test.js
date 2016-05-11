'use strict';

const test = require('tape');
const rejectGitignore = require('../../lib/rejectGitignore');

test('should not match common .gitignore paths', t => {
  t.plan(8);

  t.notOk(rejectGitignore('path/.git'));
  t.notOk(rejectGitignore('path/node_modules'));
  t.notOk(rejectGitignore('path/dist'));
  t.notOk(rejectGitignore('path/bower_components'));
  t.notOk(rejectGitignore('path/tem'));
  t.notOk(rejectGitignore('path/temp'));
  t.notOk(rejectGitignore('path/jspm_packages'));
  t.notOk(rejectGitignore('path/.DS_Store'));
});

test('should match other paths', t => {
  t.plan(3);

  t.ok(rejectGitignore('path/something/file.js'));
  t.ok(rejectGitignore('path/file.js'));
  t.ok(rejectGitignore('file.js'));
});
