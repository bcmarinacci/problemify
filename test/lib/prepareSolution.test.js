/* eslint no-multiple-empty-lines: "off" */

import test from 'ava';
import prepareSolution from '../../dist/lib/prepareSolution';

test('should be a function', t => {
  t.true(prepareSolution instanceof Function);
});

test('should remove problem code', t => {
  t.is(prepareSolution('/* start problem\nconst jedi = "rey"\nend problem */\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
  t.is(prepareSolution('/* first start problem\nconst jedi = "rey"\nthen end problem */\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
  t.is(prepareSolution('/* start problem code\nconst jedi = "rey"\nend problem code */\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
  t.is(prepareSolution('  /* start problem\n  const jedi = "rey"\n  end problem */\n  const droid = "r2-d2"'), '  const droid = "r2-d2"');
  t.is(prepareSolution('/*start problem\nconst jedi = "rey"\nend problem*/\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
  t.is(prepareSolution('/*    start problem\nconst jedi = "rey"\nend problem    */\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
  t.is(prepareSolution('/* START PROBLEM\nconst jedi = "rey"\nEND PROBLEM */\nconst droid = "r2-d2"'), 'const droid = "r2-d2"');
});

test('should remove all solution comments', t => {
  t.is(prepareSolution('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
  t.is(prepareSolution('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
  t.is(prepareSolution('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
  t.is(prepareSolution('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "han"\n'), '  const x = 2187;\n  const pilot = "han"\n');
  t.is(prepareSolution('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
  t.is(prepareSolution('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
  t.is(prepareSolution('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "han"\n'), 'const x = 2187;\nconst pilot = "han"\n');
});

test('should retain indentation', t => {
  t.is(prepareSolution('   const copilot = "chewbacca";\n    console.log(copilot);\n'), '   const copilot = "chewbacca";\n    console.log(copilot);\n');
});

test('should remove problem code and leave non-problem code', t => {
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

  t.is(prepareSolution(mock), result);
});

test('should remove solution comments and leave solution code and non-problem code', t => {
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

  t.is(prepareSolution(mock), result);
});
