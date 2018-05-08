/*
    declaration('width:100%')
    declaration({
        prop: 'width',
        value: '100%'
    })
*/

const baseDeclaration = data => {
    if (data == null) {
        return false
    }
    // string declaration
    if (typeof data === 'string') {
        if (data[data.length - 1] !== ';') {
            data += ';'
        }
        return data
    }
    // object declaration
    let { prop, value } = data
    if (value == null) {
        return false
    }
    if (Array.isArray(prop)) {
        return prop
            .map(name => name + ':' + value)
            .join(';') + ';'
    }
    return prop + ':' + value + ';'
}

const addDeclaration = (string, data) => {
    let result = baseDeclaration(data)
    return result !== false ? string + result : result
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
    return block.reduce(addDeclaration, selector + '{') + '}'
}

/*
    keyframes('name', {
        '0%': block,
        '50%': block,
        '100%': block
    })
*/

const baseFrame = (selector, block) => {
    if (Array.isArray(block)) {
        return ruleset(selector, block)
    }
    return `${selector}{${addDeclaration('', block)}}`
}

const keyframes = (name, frames) => {
    let result = Object.keys(frames).reduce((string, selector) => {
        return string + baseFrame(selector, frames[selector])
    }, '')
    return `${name}{${result}}`
}

module.exports = {
    declaration: baseDeclaration,
    ruleset,
    keyframes
}
