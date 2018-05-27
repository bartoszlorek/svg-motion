const program = require('commander')
const svgMotion = require('./index')

program
    .option('-s, --source <pattern>', 'pattern for source file(s)')
    .option('-o, --output [pattern]', 'pattern for output file(s)')
    .option('-d, --duration <pattern>', 'duration of one cycle - default: 1000')
    .option('-i, --iteration [count]', 'number of animation cycles - default: 0 (infinite)')

program.on('--help', () => {
    console.log(`
  Patterns (glob):

    *           0 or more characters
    ?           1 character
    [...]       a range of characters
    [!..]       any character not in the range

    !(a|b)      anything that does not match the given patterns
    ?(a|b)      0 or 1 occurrence of the given patterns
    *(a|b)      0 or more occurrences of the given patterns
    +(a|b)      1 or more occurrences of the given patterns
    @(a|b*|c?)  exactly 1 of the given patterns

    **/*.svg    globstar matches 0 or more subdirectories`)
})

program.parse(process.argv)

svgMotion({
    source: program.source,
    output: program.output,
    duration: +program.duration,
    iteration: +program.iteration
})
