/* eslint prefer-arrow-callback: "off" */

const rejectGitignore = require('../../lib/rejectGitignore')

describe('rejectGitignore', function () {
  it('should not match common .gitignore paths', function () {
    expect(rejectGitignore('path/.git')).toEqual(false)
    expect(rejectGitignore('path/node_modules')).toEqual(false)
    expect(rejectGitignore('path/dist')).toEqual(false)
    expect(rejectGitignore('path/bower_components')).toEqual(false)
    expect(rejectGitignore('path/tem')).toEqual(false)
    expect(rejectGitignore('path/temp')).toEqual(false)
    expect(rejectGitignore('path/jspm_packages')).toEqual(false)
    expect(rejectGitignore('path/.DS_Store')).toEqual(false)
  })

  it('should match other paths', function () {
    expect(rejectGitignore('path/something/file.js')).toEqual(true)
    expect(rejectGitignore('path/file.js')).toEqual(true)
    expect(rejectGitignore('file.js')).toEqual(true)
  })
})
