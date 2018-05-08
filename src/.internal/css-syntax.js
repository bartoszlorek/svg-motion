/*
    declaration('width:100%')
    declaration({
        prop: 'width',
        value: '100%'
    })
*/

const baseDeclaration = spec => {
    if (spec == null) {
        return false
    }
    if (typeof spec === 'string') {
        return spec
    }
    let { prop, value } = spec
    if (value == null) {
        return false
    }
    if (Array.isArray(prop)) {
        return prop.map(name => name + ':' + value).join(';')
    }
    return prop + ':' + value
}

const eachDeclaration = (result, spec) => {
    let string = baseDeclaration(spec)
    if (string !== false) {
        result += string

        // add closing semicolons
        if (result[result.length - 1] !== ';') {
            result += ';'
        }
    }
    return result
}

/*
    ruleset('selector', [
        {
            prop: 'name',
            value: 'value'
        },
        {
            prop: ['prefix-name', 'name'],
            value: 'value'
        },
        'string',
        'string',
        ...
    ])
*/

const ruleset = (selector, block) => {
    return block.reduce(eachDeclaration, selector + '{') + '}'
}

/*
    keyframes('name', {
        '0%': declaration,
        '50%': declaration,
        '100%': declaration
    })
*/

const baseFrame = (selector, block) => {
    if (Array.isArray(block)) {
        return ruleset(selector, block)
    }
    return `${selector}{${eachDeclaration('', block)}}`
}

const keyframes = (name, frames) => {
    let style = Object.keys(frames).reduce((result, selector) => {
        return result + baseFrame(selector, frames[selector])
    }, '')
    return `${name}{${style}}`
}

module.exports = {
    declaration: baseDeclaration,
    ruleset,
    keyframes
}
