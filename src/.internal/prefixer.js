const vendors = {
    keyframes: ['@-webkit-', '@'],
    animation: ['-webkit-', ''],
    animationDelay: ['-webkit-', '']
}

const camelCaseToDash = value => {
    return value.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

const operator = key => {
    const separator = vendors[key][0][0] === '@' ? ' ' : ':'
    const prop = camelCaseToDash(key)

    return value => vendors[key].reduce((str, prefix) => {
        return str + `${prefix + prop}${separator}${value}`
    }, '')
}

const api = {}
Object.keys(vendors).forEach(prop => {
    api[prop] = operator(prop)
})

module.exports = api
