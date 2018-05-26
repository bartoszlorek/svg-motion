const path = require('path')
const log = require('./.utils/logger')
const isPattern = require('./.internal/is-pattern')

const MARKER = '[name]'

module.exports = function(config, defaultSuffix = '') {
    const { source, output } = config
    let pattern = ''

    if (output) {
        pattern = output
        if (isPattern(source) && pattern.indexOf(MARKER) < 0) {
            return log.error(
                'It looks like the given source contains a pattern and will generate\nseveral files. Please include marker `[name]` in output string.'
            )
        }
        if (source === output) {
            return log.error('Source and output cannot have the same value.')
        }
    } else {
        const { base, ext } = path.parse(source)
        pattern = source.slice(0, -base.length) + MARKER + defaultSuffix + ext
    }

    return filepath => {
        const { name } = path.parse(filepath)
        return pattern.replace(MARKER, name)
    }
}
