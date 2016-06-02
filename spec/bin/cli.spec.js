/* eslint-disable prefer-arrow-callback */
'use strict';

const { execFileSync } = require('child_process');
const trim = require('trim-whitespace');

describe('cli', function () {
  it('should output a list of created files', function () {
    const expectedStdout = `/Users/benji/Documents/code/problemify/spec/fixtures/utils-problem/higher-order/for-each/for-each.js
      /Users/benji/Documents/code/problemify/spec/fixtures/utils-problem/higher-order/map/map.js
      /Users/benji/Documents/code/problemify/spec/fixtures/utils-problem/print/print.js
      /Users/benji/Documents/code/problemify/spec/fixtures/utils-solution/higher-order/for-each/for-each.js
      /Users/benji/Documents/code/problemify/spec/fixtures/utils-solution/higher-order/map/map.js
      /Users/benji/Documents/code/problemify/spec/fixtures/utils-solution/print/print.js
    `;

    const stdout = execFileSync(`${__dirname}/../../bin/cli.js`, [`${__dirname}/../fixtures/utils`]);
    expect(trim(stdout.toString())).toEqual(trim(expectedStdout));
  });

  it('should output an error if an invalid directory path is used', function () {
    expect(() => execFileSync(`${__dirname}/../../bin/cli.js`, ['invalid/directory/path'])).toThrow();
  });
});
