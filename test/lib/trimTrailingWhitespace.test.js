import test from 'ava';
import trim from '../../dist/lib/trimTrailingWhitespace';

test('should remove trailing space characters', t => {
  const test = 'a \nb  \n  ';
  const result = 'a\nb\n';

  t.is(trim(test), result);
});

test('should remove trailing tab characters', t => {
  const test = 'a\t\nb\t\t\n\t\t';
  const result = 'a\nb\n';

  t.is(trim(test), result);
});
