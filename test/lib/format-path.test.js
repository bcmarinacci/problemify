'use strict';

const test = require('tape');
const formatPath = require('../../lib/format-path');

test('should remove trailing slashes', t => {
  t.plan(6);

  t.equal(formatPath('directory/'), 'directory');
  t.equal(formatPath('./directory/'), './directory');
  t.equal(formatPath('/path/path/directory/'), '/path/path/directory');
  t.equal(formatPath('directory//'), 'directory');
  t.equal(formatPath('./directory//'), './directory');
  t.equal(formatPath('/path/path/directory//'), '/path/path/directory');
});

test('should not modify the path if it does not contain trailing slashes', t => {
  t.plan(3);

  t.equal(formatPath('directory'), 'directory');
  t.equal(formatPath('./directory'), './directory');
  t.equal(formatPath('/path/path/directory'), '/path/path/directory');
});
