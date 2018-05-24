const fs = require('fs')
const glob = require('glob')

const log = require('./.utils/logger')
const readFileAsync = require('./.utils/read-file-async')
const waitForEach = require('./.utils/wait-for-each')

const optimize = require('./svg-optimizer')
const makeConverter = require('./make-converter')
const resolveOutput = require('./resolve-output')

const ENCODING = 'utf8'
const DEFAULTS = {
    source: '',
    output: '',
    duration: 1000
}

function svgMotion(options) {
    const config = Object.assign({}, DEFAULTS, options)

    const source = config.source
    if (!source || typeof source !== 'string') {
        return log.error('The conversion requires source pattern.')
    }

    const getOutput = resolveOutput(config, '-motion')
    if (getOutput === false) {
        return
    }
    const convert = makeConverter(config)
    const files = glob.sync(source)
    let remains = files.length - 1

    files.forEach(filepath => log.label('Source:', filepath))
    log.comment('--------------------------------')

    waitForEach(filepath => {
        const saveOutput = data => {
            let output = getOutput(filepath)
            fs.writeFile(output, data, ENCODING, () => {
                log.label('Output:', output)
                if (!remains--) {
                    log.comment('The SVG files have been created.')
                }
            })
        }
        return readFileAsync(filepath, ENCODING)
            .then(optimize)
            .then(convert)
            .then(saveOutput)
            .catch(log.error)
    }, files)
}

module.exports = svgMotion
