/* eslint no-multiple-empty-lines: "off", prefer-arrow-callback: "off" */

const prepareSolution = require('../../lib/prepareSolution')

describe('prepareSolution', function () {
  it('should remove problem code', function () {
    expect(prepareSolution('/* start problem\nconst jedi = "rey"\nend problem */\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
    expect(prepareSolution('/* first start problem\nconst jedi = "rey"\nthen end problem */\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
    expect(prepareSolution('/* start problem code\nconst jedi = "rey"\nend problem code */\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
    expect(prepareSolution('  /* start problem\n  const jedi = "rey"\n  end problem */\n  const droid = "r2-d2"')).toEqual('  const droid = "r2-d2"')
    expect(prepareSolution('/*start problem\nconst jedi = "rey"\nend problem*/\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
    expect(prepareSolution('/*    start problem\nconst jedi = "rey"\nend problem    */\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
    expect(prepareSolution('/* START PROBLEM\nconst jedi = "rey"\nEND PROBLEM */\nconst droid = "r2-d2"')).toEqual('const droid = "r2-d2"')
  })

  it('should remove solution comments', function () {
    expect(prepareSolution('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
    expect(prepareSolution('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
    expect(prepareSolution('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
    expect(prepareSolution('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "han"\n')).toEqual('  const x = 2187;\n  const pilot = "han"\n')
    expect(prepareSolution('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
    expect(prepareSolution('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
    expect(prepareSolution('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "han"\n')).toEqual('const x = 2187;\nconst pilot = "han"\n')
  })

  it('should leave normal code unaffected', function () {
    const mock = '// normal code'

    expect(prepareSolution(mock)).toEqual(mock)
  })

  it('should retain indentation', function () {
    const mock = '   const copilot = "chewbacca";\n    console.log(copilot);\n'

    expect(prepareSolution(mock)).toEqual(mock)
  })

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

    console.log(jedi);`

    const result = `

    // comment
    const jedi = 'Obi-Wan';


    console.log(jedi);`

    expect(prepareSolution(mock)).toEqual(result)
  })

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

    console.log(jedi);`

    const result = `
    function print(val) {
      console.log(val);
    }

    // comment
    const jedi = 'Obi-Wan';

    print(jedi);

    console.log(jedi);`

    expect(prepareSolution(mock)).toEqual(result)
  })
})
