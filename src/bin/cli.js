#!/usr/bin/env node

import meow from 'meow';

const cli = meow(`
  Usage
    $ problemify <input-directory>

  Options
    --problem Output problem repository
    --solution Output solution repository

  Example
     $ problemify death-star-plans
`);

console.log(cli);
