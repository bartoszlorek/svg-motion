const fs = require('fs')
const glob = require('glob')
const { defaults } = require('lodash')

const log = require('./.utils/logger')
const readFileAsync = require('./.utils/read-file-async')
const waitForEach = require('./.utils/wait-for-each')

const optimizer = require('./svg-optimizer')
const makeConverter = require('./svg-converter')
const resolveOutput = require('./resolve-output')

const ENCODING = 'utf8'
const DEFAULTS = {
    source: '',
    output: '',
    duration: 1000
}

module.exports = function(options) {
    const config = defaults({}, options, DEFAULTS)

    const source = config.source
    if (!source || typeof source !== 'string') {
        return log.error('The conversion requires source pattern.')
    }

    const files = glob.sync(source)
    let remains = files.length
    if (remains === 0) {
        return log.error(`There is no file(s) with given pattern '${source}'.`)
    }

    const converter = makeConverter(config)
    const output = resolveOutput(config, '-motion')
    if (!output) {
        return
    }

    files.forEach(srcpath => log.label('Source:', srcpath))
    log.comment('--------------------------------')

    waitForEach(srcpath => {
        return readFileAsync(srcpath, ENCODING)
            .then(optimizer)
            .then(converter)
            .then(data => {
                let outpath = output(srcpath)
                fs.writeFile(outpath, data, ENCODING, () => {
                    log.label('Output:', outpath)
                    if (!--remains) {
                        log.comment('The SVG files have been created.')
                    }
                })
            })
            .catch(log.error)
    }, files)
}
