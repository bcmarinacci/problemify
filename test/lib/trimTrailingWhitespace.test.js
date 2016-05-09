'use strict';

const test = require('tape');
const trim = require('../../lib/trimTrailingWhitespace');

test('should remove trailing space characters', (t) => {
  t.plan(1);

  const mock = 'a \nb  \n  ';
  const result = 'a\nb\n';

  t.equal(trim(mock), result);
});

test('should remove trailing tab characters', (t) => {
  t.plan(1);

  const mock = 'a\t\nb\t\t\n\t\t';
  const result = 'a\nb\n';

  t.equal(trim(mock), result);
});
