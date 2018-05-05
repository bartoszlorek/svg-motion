module.exports = function(object, props) {
    if (object == null) {
        return null
    }
    if (props == null || !props.length) {
        return object
    }
    const result = {}
    Object.keys(object).forEach(prop => {
        if (props.indexOf(prop) < 0) {
            result[prop] = object[prop]
        }
    })
    return result
}
