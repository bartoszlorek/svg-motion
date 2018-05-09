const add = (fn, context) => {
    return context != null
        ? (a, b) => a + fn(b, context[b])
        : (a, b) => a + fn(b)
}

const semicolon = a => {
    return a[a.length - 1] === ';' ? a : a + ';'
}

const block = (name, body) => {
    return name + '{' + (body || '') + '}'
}

/*
    declaration('width:100%')
    declaration({
        prop: 'width',
        value: '100%'
    })
*/

const declaration = data => {
    if (data == null) {
        return ''
    }
    // string declaration
    if (typeof data === 'string') {
        return semicolon(data)
    }
    // object declaration
    let { prop, value } = data
    if (value == null) {
        return ''
    }
    // prefixes of property
    if (Array.isArray(prop)) {
        return prop
            .map(name => name + ':' + value)
            .join(';') + ';'
    }
    return prop + ':' + value + ';'
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

const ruleset = (selector, declarations) => {
    if (Array.isArray(declarations)) {
        return block(selector, declarations
            .reduce(add(declaration), ''))
    }
    if (typeof declarations === 'string') {
        return block(selector, semicolon(declarations))
    }
    return ''
}

/* 
    without body:
    atRule('keyword', 'rule')

    unconditional:
    atRule('keyword', 'name', [
        declaration,
        declaration,
        ...
    ])

    conditional:
    atRule('keyword', 'name', {
        rule: declarations,
        rule: declarations,
        ...
    })
*/

const atRule = (keyword, name, body) => {
    let result = '@' + keyword + ' '

    if (body == null) {
        return result + name + ';'
    }
    // unconditional
    if (Array.isArray(body)) {
        return result + ruleset(name, body)
    }
    // conditional
    return result + block(name, Object.keys(body)
        .reduce(add(ruleset, body), ''))
}

module.exports = {
    block,
    declaration,
    ruleset,
    atRule
}
