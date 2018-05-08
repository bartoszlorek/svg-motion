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
    return selector + block.reduce(addDeclaration, '{') + '}'
}

/*
    atRule('keyword', 'rule', {
        'selector': block,
        'selector': block,
        'selector': block
    })
*/

const baseBlock = (selector, block) => {
    if (Array.isArray(block)) {
        return ruleset(selector, block)
    }
    return `${selector}{${addDeclaration('', block)}}`
}

const atRule = (keyword, rule = '', block = {}) => {
    let result = '@' + keyword + ' '
    if (rule) {
        result += rule
    }
    let statements = Object.keys(block)
    if (statements.length) {
        result += statements.reduce((string, selector) => {
            return string + baseBlock(selector, block[selector])
        }, '{') + '}'
    }
    return result
}

module.exports = {
    declaration: baseDeclaration,
    ruleset,
    atRule
}
