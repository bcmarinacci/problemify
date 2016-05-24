/* eslint-disable prefer-arrow-callback */
'use strict';

const prepareSolution = require('../../lib/prepare-solution');

describe('prepareSolution', function () {
  it('should remove problem code', function () {
    expect(prepareSolution('/* start problem\nconst jedi = "Rey;"\nend problem */\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
    expect(prepareSolution('/* first start problem\nconst jedi = "Rey;"\nthen end problem */\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
    expect(prepareSolution('/* start problem code\nconst jedi = "Rey;"\nend problem code */\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
    expect(prepareSolution('  /* start problem\n  const jedi = "Rey;"\n  end problem */\n  const droid = "R2-D2";')).toEqual('  const droid = "R2-D2";');
    expect(prepareSolution('/*start problem\nconst jedi = "Rey;"\nend problem*/\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
    expect(prepareSolution('/*    start problem\nconst jedi = "Rey;"\nend problem    */\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
    expect(prepareSolution('/* START PROBLEM\nconst jedi = "Rey;"\nEND PROBLEM */\nconst droid = "R2-D2";')).toEqual('const droid = "R2-D2";');
  });

  it('should remove solution comments', function () {
    expect(prepareSolution('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(prepareSolution('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(prepareSolution('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(prepareSolution('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "Han";\n')).toEqual('  const x = 2187;\n  const pilot = "Han";\n');
    expect(prepareSolution('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(prepareSolution('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(prepareSolution('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "Han";\n')).toEqual('const x = 2187;\nconst pilot = "Han";\n');
  });

  it('should not modify normal code', function () {
    const mock = '// normal code';

    expect(prepareSolution(mock)).toEqual(mock);
  });

  it('should retain indentation', function () {
    const mock = '   const copilot = "Chewbacca";\n    console.log(copilot);\n';

    expect(prepareSolution(mock)).toEqual(mock);
  });

  it('should remove problem code whie leaving non-problem code', function () {
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

    expect(prepareSolution(mock)).toEqual(result);
  });

  it('should remove solution comments while leaving non-problem code', function () {
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

    expect(prepareSolution(mock)).toEqual(result);
  });
});
