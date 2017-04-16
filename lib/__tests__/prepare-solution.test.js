'use strict';

const prepareSolution = require('../prepare-solution');

describe('prepareSolution', () => {
  it('should remove problem code', () => {
    expect(
      prepareSolution(
        '/* start problem\nconst jedi = "Rey;"\nend problem */\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '/* first start problem\nconst jedi = "Rey;"\nthen end problem */\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '/* start problem code\nconst jedi = "Rey;"\nend problem code */\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '  /* start problem\n  const jedi = "Rey;"\n  end problem */\n  const droid = "R2-D2";'
      )
    ).toEqual('  const droid = "R2-D2";');
    expect(
      prepareSolution(
        '/*start problem\nconst jedi = "Rey;"\nend problem*/\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '/*    start problem\nconst jedi = "Rey;"\nend problem    */\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '/* START PROBLEM\nconst jedi = "Rey;"\nEND PROBLEM */\nconst droid = "R2-D2";'
      )
    ).toEqual('const droid = "R2-D2";');
    expect(
      prepareSolution(
        '<!-- start problem -->\n<div class="problem"></div>\n<!-- end problem -->\n<div class="x-wing"></div>\n'
      )
    ).toEqual('<div class="x-wing"></div>\n');
  });

  it('should remove solution comments', () => {
    expect(
      prepareSolution(
        '// start solution\nconst x = 2187;\n// end solution\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "Han";\n'
      )
    ).toEqual('  const x = 2187;\n  const pilot = "Han";\n');
    expect(
      prepareSolution(
        '//start solution\nconst x = 2187;\n//end solution\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "Han";\n'
      )
    ).toEqual('const x = 2187;\nconst pilot = "Han";\n');
    expect(
      prepareSolution(
        '<!-- start solution -->\n<div class="solution"></div>\n<!-- end solution -->\n'
      )
    ).toEqual('<div class="solution"></div>\n');
  });

  it('should not modify normal code', () => {
    const mock = '// normal code';

    expect(prepareSolution(mock)).toEqual(mock);
  });

  it('should retain indentation', () => {
    const mock = '   const copilot = "Chewbacca";\n    console.log(copilot);\n';

    expect(prepareSolution(mock)).toEqual(mock);
  });

  it('should remove problem code whie leaving non-problem code', () => {
    const mock = `
      <body>
        <!-- start problem -->
        <div class="problem"></div>
        <!-- end problem -->

        <div class="x-wing"></div>
      </body>

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
      <body>

        <div class="x-wing"></div>
      </body>


    // comment
    const jedi = 'Obi-Wan';


    console.log(jedi);`;

    expect(prepareSolution(mock)).toEqual(result);
  });

  it('should remove solution comments while leaving non-problem code', () => {
    const mock = `
      <body>
        <!-- start solution -->
        <div class="solution"></div>
        <!-- end solution -->

        <div class="x-wing"></div>
      </body>

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
      <body>
        <div class="solution"></div>

        <div class="x-wing"></div>
      </body>

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
