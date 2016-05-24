/* eslint-disable prefer-arrow-callback */
'use strict';

const formatPath = require('../../lib/format-path');

describe('formatPath', function () {
  it('should remove trailing slashes', function () {
    expect(formatPath('directory/')).toEqual('directory');
    expect(formatPath('./directory/')).toEqual('./directory');
    expect(formatPath('/path/path/directory/')).toEqual('/path/path/directory');
    expect(formatPath('directory//')).toEqual('directory');
    expect(formatPath('./directory//')).toEqual('./directory');
    expect(formatPath('/path/path/directory//')).toEqual('/path/path/directory');
  });

  it('should not modify the path if it does not contain trailing slashes', function () {
    expect(formatPath('directory')).toEqual('directory');
    expect(formatPath('./directory')).toEqual('./directory');
    expect(formatPath('/path/path/directory')).toEqual('/path/path/directory');
  });
});
