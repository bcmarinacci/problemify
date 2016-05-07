const test = require('tape');
const prepareSolution = require('../../lib/prepareSolution');

test('should remove problem code', (t) => {
  t.plan(7);

  t.equal(prepareSolution('/* start problem\nconst jedi = "Rey;"\nend problem */\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
  t.equal(prepareSolution('/* first start problem\nconst jedi = "Rey;"\nthen end problem */\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
  t.equal(prepareSolution('/* start problem code\nconst jedi = "Rey;"\nend problem code */\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
  t.equal(prepareSolution('  /* start problem\n  const jedi = "Rey;"\n  end problem */\n  const droid = "R2-D2";'), '  const droid = "R2-D2";');
  t.equal(prepareSolution('/*start problem\nconst jedi = "Rey;"\nend problem*/\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
  t.equal(prepareSolution('/*    start problem\nconst jedi = "Rey;"\nend problem    */\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
  t.equal(prepareSolution('/* START PROBLEM\nconst jedi = "Rey;"\nEND PROBLEM */\nconst droid = "R2-D2";'), 'const droid = "R2-D2";');
});

test('should remove solution comments', (t) => {
  t.plan(7);

  t.equal(prepareSolution('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
  t.equal(prepareSolution('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
  t.equal(prepareSolution('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
  t.equal(prepareSolution('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "Han";\n'), '  const x = 2187;\n  const pilot = "Han";\n');
  t.equal(prepareSolution('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
  t.equal(prepareSolution('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
  t.equal(prepareSolution('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "Han";\n'), 'const x = 2187;\nconst pilot = "Han";\n');
});

test('should not modify normal code', (t) => {
  t.plan(1);

  const mock = '// normal code';

  t.equal(prepareSolution(mock), mock);
});

test('should retain indentation', (t) => {
  t.plan(1);

  const mock = '   const copilot = "Chewbacca";\n    console.log(copilot);\n';

  t.equal(prepareSolution(mock), mock);
});

test('should remove problem code whie leaving non-problem code', (t) => {
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

  // comment
  const jedi = 'Obi-Wan';


  console.log(jedi);`;

  t.equal(prepareSolution(mock), result);
});

test('should remove solution comments while leaving non-problem code', (t) => {
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
  function print(val) {
    console.log(val);
  }

  // comment
  const jedi = 'Obi-Wan';

  print(jedi);

  console.log(jedi);`;

  t.equal(prepareSolution(mock), result);
});
