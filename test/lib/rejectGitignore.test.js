import test from 'ava';
import rejectGitignore from '../../dist/lib/rejectGitignore';

test('should not match common .gitignore paths', t => {
  t.false(rejectGitignore('path/.git'));
  t.false(rejectGitignore('path/node_modules'));
  t.false(rejectGitignore('path/dist'));
  t.false(rejectGitignore('path/bower_components'));
  t.false(rejectGitignore('path/tem'));
  t.false(rejectGitignore('path/temp'));
  t.false(rejectGitignore('path/jspm_packages'));
  t.false(rejectGitignore('path/.DS_Store'));
});

test('should match other paths', t => {
  t.true(rejectGitignore('path/something/file.js'));
  t.true(rejectGitignore('path/file.js'));
  t.true(rejectGitignore('file.js'));
});
