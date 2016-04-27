/* eslint no-multiple-empty-lines: "off", prefer-arrow-callback: "off" */

const prepareProblem = require('../../lib/prepareProblem')

describe('prepareProblem', function () {
  it('should remove solution code', function () {
    expect(prepareProblem('// start solution\nconst x = 2187;\n// end solution\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
    expect(prepareProblem('// first start solution\nconst x = 2187;\n// then end solution\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
    expect(prepareProblem('// start solution code\nconst x = 2187;\n// end solution code\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
    expect(prepareProblem('  // start solution\n  const x = 2187;\n  // end solution\n  const pilot = "han"\n')).toEqual('  const pilot = "han"\n')
    expect(prepareProblem('//start solution\nconst x = 2187;\n//end solution\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
    expect(prepareProblem('//   start solution\nconst x = 2187;\n//   end solution\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
    expect(prepareProblem('// START SOLUTION\nconst x = 2187;\n// END SOLUTION\nconst pilot = "han"\n')).toEqual('const pilot = "han"\n')
  })

  it('should remove problem comments', function () {
    expect(prepareProblem('/* start problem\nconst jedi = "rey"\nend problem */\n')).toEqual('const jedi = "rey"\n')
    expect(prepareProblem('/* first start problem\nconst jedi = "rey"\nthen end problem */\n')).toEqual('const jedi = "rey"\n')
    expect(prepareProblem('/* start problem code\nconst jedi = "rey"\nend problem code */\n')).toEqual('const jedi = "rey"\n')
    expect(prepareProblem('  /* start problem\n  const jedi = "rey"\n  end problem */\n')).toEqual('  const jedi = "rey"\n')
    expect(prepareProblem('/*start problem\nconst jedi = "rey"\nend problem*/\n')).toEqual('const jedi = "rey"\n')
    expect(prepareProblem('/*    start problem\nconst jedi = "rey"\nend problem    */\n')).toEqual('const jedi = "rey"\n')
    expect(prepareProblem('/* START PROBLEM\nconst jedi = "rey"\nEND PROBLEM */\n')).toEqual('const jedi = "rey"\n')
  })

  it('should leave normal code unaffected', function () {
    const mock = '// normal code'

    expect(prepareProblem(mock)).toEqual(mock)
  })

  it('should retain indentation', function () {
    const mock = '   const copilot = "chewbacca";\n    console.log(copilot);\n'

    expect(prepareProblem(mock)).toEqual(mock)
  })

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

    console.log(jedi);`

    const result = `

    // comment
    const jedi = 'Obi-Wan';


    console.log(jedi);`

    expect(prepareProblem(mock)).toEqual(result)
  })

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

    console.log(jedi);`

    const result = `
    function print(val) {
      console.log(val);
    }

    // comment
    const jedi = 'Obi-Wan';

    print(jedi);

    console.log(jedi);`

    expect(prepareProblem(mock)).toEqual(result)
  })
})
