/* eslint no-multiple-empty-lines: "off" */

import test from 'ava';
import prepareProblem from '../../dist/lib/prepareProblem';

test('should be a function', t => {
  t.true(prepareProblem instanceof Function);
});

test('should remove all solution code', t => {
  t.is(prepareProblem('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "han"\n'), 'const pilot = "han"\n');
  t.is(prepareProblem('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "han"\n'), 'const pilot = "han"\n');
  t.is(prepareProblem('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "han"\n'), 'const pilot = "han"\n');
  t.is(prepareProblem('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "han"\n'), '  const pilot = "han"\n');
  t.is(prepareProblem('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "han"\n'), 'const pilot = "han"\n');
  t.is(prepareProblem('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "han"\n'), 'const pilot = "han"\n');
  t.is(prepareProblem('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "han"\n'), 'const pilot = "han"\n');
});

test('should remove problem comments', t => {
  t.is(prepareProblem('/* start problem\nconst jedi = "rey"\nend problem */\n'), 'const jedi = "rey"\n');
  t.is(prepareProblem('/* first start problem\nconst jedi = "rey"\nthen end problem */\n'), 'const jedi = "rey"\n');
  t.is(prepareProblem('/* start problem code\nconst jedi = "rey"\nend problem code */\n'), 'const jedi = "rey"\n');
  t.is(prepareProblem('  /* start problem\n  const jedi = "rey"\n  end problem */\n'), '  const jedi = "rey"\n');
  t.is(prepareProblem('/*start problem\nconst jedi = "rey"\nend problem*/\n'), 'const jedi = "rey"\n');
  t.is(prepareProblem('/*    start problem\nconst jedi = "rey"\nend problem    */\n'), 'const jedi = "rey"\n');
  t.is(prepareProblem('/* START PROBLEM\nconst jedi = "rey"\nEND PROBLEM */\n'), 'const jedi = "rey"\n');
});

test('should retain indentation', t => {
  t.is(prepareProblem('   const copilot = "chewbacca";\n    console.log(copilot);\n'), '   const copilot = "chewbacca";\n    console.log(copilot);\n');
});

test('should remove solution code and leave non-solution code', t => {
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

  t.is(prepareProblem(mock), result);
});

test('should remove problem comments and leave problem code and non-solution code', t => {
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

  t.is(prepareProblem(mock), result);
});
