#!/usr/bin/env node

const chalk = require('chalk')
const meow = require('meow')
const ncp = require('ncp')
const pify = require('pify')
const rejectGitignore = require('../lib/rejectGitignore')
const formatPath = require('../lib/formatPath')
const prepareProblem = require('../lib/prepareProblem')
const prepareSolution = require('../lib/prepareSolution')

const problemify = function (srcDir, destDir, cb) {
  // match root directory name without slashes
  const regex = /.*?\/*([^<>:"\/\\|?*]+)\/*$/
  const rootDirname = srcDir.replace(regex, '$1')
  let fileCount = 0
  const ncpOptions = {
    // stopOnErr: true,
    filter: rejectGitignore,
    transform (fileReadable, fileWriteable) {
      let file = ''
      fileReadable.on('data', chunk => {
        file += chunk
      })

      fileReadable.on('end', () => {
        fileWriteable.write(cb(file))
        const srcName = fileReadable.path
        const srcIndex = srcName.lastIndexOf(rootDirname)
        const destName = fileWriteable.path
        const destIndex = destName.lastIndexOf(rootDirname)
        console.log(chalk.blue(`${++fileCount}. ${srcName.slice(srcIndex)} → ${destName.slice(destIndex)}`))
        fileWriteable.end()
      })

      fileReadable.on('error', err => {
        throw err
      })

      fileWriteable.on('error', err => {
        throw err
      })
    }
  }

  return pify(ncp)(srcDir, destDir, ncpOptions)
}

const cli = meow(`
  Usage
    $ problemify <repository>

  Example
    $ problemify kessel-run
    $ ls
    kessel-run    kessel-run-problem    kessel-run-solution
`)

const cliInput = cli.input[0]
if (!cliInput) {
  console.log(chalk.blue(cli.help))
  process.exit(1)
}

const formattedCliInput = formatPath(cliInput)
const problemDest = `${formattedCliInput}-problem`
const solutionDest = `${formattedCliInput}-solution`
problemify(formattedCliInput, problemDest, prepareProblem)
  .then(() => {
    return problemify(formattedCliInput, solutionDest, prepareSolution)
  })
  .catch(err => {
    console.log(chalk.yellow("Something went wrong. See 'problemify --help' for usage information."))
    console.error(chalk.red(err.stack || err))
    process.exit(1)
  })
