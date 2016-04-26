/* eslint prefer-arrow-callback: "off" */

import trim from '../../dist/lib/trimTrailingWhitespace';

describe('trimTrailingWhitespace', function () {
  it('should remove trailing space characters', function () {
    const mock = 'a \nb  \n  ';
    const result = 'a\nb\n';

    expect(trim(mock)).toEqual(result);
  });

  it('should remove trailing tab characters', function () {
    const mock = 'a\t\nb\t\t\n\t\t';
    const result = 'a\nb\n';

    expect(trim(mock)).toEqual(result);
  });
});
