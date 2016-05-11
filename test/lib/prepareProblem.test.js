'use strict';

const test = require('tape');
const prepareProblem = require('../../lib/prepareProblem');

test('should remove solution code', t => {
  t.plan(7);

  t.equal(prepareProblem('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
  t.equal(prepareProblem('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
  t.equal(prepareProblem('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
  t.equal(prepareProblem('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "Han;"\n'), '  const pilot = "Han;"\n');
  t.equal(prepareProblem('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
  t.equal(prepareProblem('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
  t.equal(prepareProblem('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "Han;"\n'), 'const pilot = "Han;"\n');
});

test('should remove problem comments', t => {
  t.plan(7);

  t.equal(prepareProblem('/* start problem\nconst jedi = "Rey;"\nend problem */\n'), 'const jedi = "Rey;"\n');
  t.equal(prepareProblem('/* first start problem\nconst jedi = "Rey;"\nthen end problem */\n'), 'const jedi = "Rey;"\n');
  t.equal(prepareProblem('/* start problem code\nconst jedi = "Rey;"\nend problem code */\n'), 'const jedi = "Rey;"\n');
  t.equal(prepareProblem('  /* start problem\n  const jedi = "Rey;"\n  end problem */\n'), '  const jedi = "Rey;"\n');
  t.equal(prepareProblem('/*start problem\nconst jedi = "Rey;"\nend problem*/\n'), 'const jedi = "Rey;"\n');
  t.equal(prepareProblem('/*    start problem\nconst jedi = "Rey;"\nend problem    */\n'), 'const jedi = "Rey;"\n');
  t.equal(prepareProblem('/* START PROBLEM\nconst jedi = "Rey;"\nEND PROBLEM */\n'), 'const jedi = "Rey;"\n');
});

test('should not modify normal code', t => {
  t.plan(1);

  const mock = '// normal code';

  t.equal(prepareProblem(mock), mock);
});

test('should retain indentation', t => {
  t.plan(1);

  const mock = '   const copilot = "Chewbacca";\n    console.log(copilot);\n';

  t.equal(prepareProblem(mock), mock);
});

test('should remove solution code while leaving non-solution code', t => {
  t.plan(1);

  const mock = `
  // start solution
  function print(val) {
    console.log(val);
  }
  // end solution

  // comment
  const jedi = 'Obi-Wan';

  // start solution
  print(jedi);
  // end solution

  console.log(jedi);`;

  const result = `

  // comment
  const jedi = 'Obi-Wan';


  console.log(jedi);`;

  t.equal(prepareProblem(mock), result);
});

test('should remove problem comments while leaving non-solution code', t => {
  t.plan(1);

  const mock = `
  /* start problem
  function print(val) {
    console.log(val);
  }
  end problem */

  // comment
  const jedi = 'Obi-Wan';

  /* start problem
  print(jedi);
  end problem */

  console.log(jedi);`;

  const result = `
  function print(val) {
    console.log(val);
  }

  // comment
  const jedi = 'Obi-Wan';

  print(jedi);

  console.log(jedi);`;

  t.equal(prepareProblem(mock), result);
});
