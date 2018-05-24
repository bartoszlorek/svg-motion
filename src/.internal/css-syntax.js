const withValue = (fn, context) => {
    return a => fn(a, context[a])
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

const ruleset = (selector, body) => {
    if (Array.isArray(body)) {
        return block(selector, body.map(declaration).join(''))
    }
    if (typeof body === 'string') {
        return block(selector, semicolon(body))
    }
    return ''
}

/* 
    without body:
    atRule('keyword', 'rule')

    string:
    atRule('keyword', 'name', 'rulesets')

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

const baseAtRule = (keyword, name, body) => {
    let result = '@' + keyword + ' '

    if (body == null) {
        return result + name + ';'
    }
    if (typeof body === 'string') {
        return result + name + '{' + body + '}'
    }
    // unconditional
    if (Array.isArray(body)) {
        return result + ruleset(name, body)
    }
    // conditional
    return result + block(name, Object.keys(body)
        .map(withValue(ruleset, body)).join(''))
}

const atRule = (keyword, name, body) => {
    if (Array.isArray(keyword)) {
        return keyword.map(key =>
            baseAtRule(key, name, body)
        ).join('')
    }
    return baseAtRule(keyword, name, body)
}

module.exports = {
    block,
    declaration,
    ruleset,
    atRule
}
