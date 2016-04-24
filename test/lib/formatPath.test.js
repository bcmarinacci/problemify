import test from 'ava';
import formatPath from '../../dist/lib/formatPath';

test('remove trailing slashes', t => {
  t.is(formatPath('directory/'), 'directory');
  t.is(formatPath('./directory/'), './directory');
  t.is(formatPath('/path/path/directory/'), '/path/path/directory');
  t.is(formatPath('directory//'), 'directory');
  t.is(formatPath('./directory//'), './directory');
  t.is(formatPath('/path/path/directory//'), '/path/path/directory');
});

test('return the path if it does not contain a trailing slash', t => {
  t.is(formatPath('directory'), 'directory');
  t.is(formatPath('./directory'), './directory');
  t.is(formatPath('/path/path/directory'), '/path/path/directory');
});

