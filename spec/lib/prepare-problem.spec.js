/* eslint-disable prefer-arrow-callback */
'use strict';

const prepareProblem = require('../../lib/prepare-problem');

describe('prepareProblem', function () {
  it('should remove solution code', function () {
    expect(prepareProblem('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
    expect(prepareProblem('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
    expect(prepareProblem('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
    expect(prepareProblem('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "Han;"\n')).toEqual('  const pilot = "Han;"\n');
    expect(prepareProblem('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
    expect(prepareProblem('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
    expect(prepareProblem('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "Han;"\n')).toEqual('const pilot = "Han;"\n');
  });

  it('should remove problem comments', function () {
    expect(prepareProblem('/* start problem\nconst jedi = "Rey;"\nend problem */\n')).toEqual('const jedi = "Rey;"\n');
    expect(prepareProblem('/* first start problem\nconst jedi = "Rey;"\nthen end problem */\n')).toEqual('const jedi = "Rey;"\n');
    expect(prepareProblem('/* start problem code\nconst jedi = "Rey;"\nend problem code */\n')).toEqual('const jedi = "Rey;"\n');
    expect(prepareProblem('  /* start problem\n  const jedi = "Rey;"\n  end problem */\n')).toEqual('  const jedi = "Rey;"\n');
    expect(prepareProblem('/*start problem\nconst jedi = "Rey;"\nend problem*/\n')).toEqual('const jedi = "Rey;"\n');
    expect(prepareProblem('/*    start problem\nconst jedi = "Rey;"\nend problem    */\n')).toEqual('const jedi = "Rey;"\n');
    expect(prepareProblem('/* START PROBLEM\nconst jedi = "Rey;"\nEND PROBLEM */\n')).toEqual('const jedi = "Rey;"\n');
  });

  it('should not modify normal code', function () {
    const mock = '// normal code';

    expect(prepareProblem(mock)).toEqual(mock);
  });

  it('should retain indentation', function () {
    const mock = '   const copilot = "Chewbacca";\n    console.log(copilot);\n';

    expect(prepareProblem(mock)).toEqual(mock);
  });

  it('should remove solution code while leaving non-solution code', function () {
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

    expect(prepareProblem(mock)).toEqual(result);
  });

  it('should remove problem comments while leaving non-solution code', function () {
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

    expect(prepareProblem(mock)).toEqual(result);
  });
});
