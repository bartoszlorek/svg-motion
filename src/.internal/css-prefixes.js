const _WEBKIT_ = '-webkit-'
const _MS_ = '-ms-'
const _MOZ_ = '-moz-'
const _O_ = '-o-'

// prettier-ignore
const schema = {
    'align-content': ['-ms-flex-line-pack'],
    'align-items': ['-webkit-box-align', '-ms-flex-align'],
    'align-self': ['-ms-flex-item-align', '-ms-grid-row-align'],
    'animation': [_WEBKIT_],
    'animation-delay': [_WEBKIT_],
    'animation-direction': [_WEBKIT_],
    'animation-duration': [_WEBKIT_],
    'animation-fill-mode': [_WEBKIT_],
    'animation-iteration-count': [_WEBKIT_],
    'animation-name': [_WEBKIT_],
    'animation-timing-function': [_WEBKIT_],
    'animation-play-state': [_WEBKIT_],
    'backface-visibility': [_WEBKIT_],
    'border-image': [_WEBKIT_, _O_],
    'box-decoration-break': [_WEBKIT_],
    'box-shadow': [_WEBKIT_],
    'box-sizing': [_WEBKIT_],
    'column-count': [_WEBKIT_],
    'column-fill': [_WEBKIT_],
    'column-gap': [_WEBKIT_],
    'column-rule': [_WEBKIT_],
    'column-rule-color': [_WEBKIT_],
    'column-rule-style': [_WEBKIT_],
    'column-rule-width': [_WEBKIT_],
    'columns': [_WEBKIT_],
    'column-span': [_WEBKIT_],
    'column-width': [_WEBKIT_],
    'filter': [_WEBKIT_],
    'flex': [_WEBKIT_],
    'flex-basis': [_WEBKIT_],
    'flex-direction': [_WEBKIT_, _MS_],
    'flex-flow': [_MS_],
    'flex-grow': [_MS_],
    'flex-shrink': [_MS_],
    'flex-wrap': [_MS_],
    'hyphens': [_WEBKIT_, _MS_],
    'justify-content': ['-webkit-box-pack', '-ms-flex-pack'],
    'keyframes': ['@-webkit-keyframes', '@keyframes'],
    'order': ['-webkit-box-ordinal-group', '-ms-flex-'],
    'perspective': [_WEBKIT_],
    'perspective-origin': [_WEBKIT_],
    'tab-size': [_MOZ_, _O_],
    'text-decoration': [_WEBKIT_],
    'text-decoration-color': [_WEBKIT_],
    'text-decoration-line': [_WEBKIT_],
    'text-decoration-style': [_WEBKIT_],
    'text-overflow': [_O_],
    'transform': [_WEBKIT_, _MS_],
    'transform-origin': [_WEBKIT_, _MS_],
    'transform-style': [_WEBKIT_],
    'transition': [_WEBKIT_, _O_],
    'transition-property': [_WEBKIT_, _O_],
    'transition-duration': [_WEBKIT_, _O_],
    'transition-timing-function': [_WEBKIT_, _O_],
    'transition-delay': [_WEBKIT_, _O_],
    'user-select': [_WEBKIT_, _MOZ_, _MS_]
}

const AT_RULES_CODE = '@'
const PREFIXES_CODE = '-'
const prefixes = {}

// compute all property's variants
Object.keys(schema).forEach(prop => {
    let variants = schema[prop]
    if (variants[0][0] === AT_RULES_CODE) {
        return
    }
    let result = variants.map(value => {
        if (value[value.length - 1] === PREFIXES_CODE) {
            value += prop
        }
        return value
    })
    result.push(prop)
    prefixes[prop] = result
})

module.exports = prop => {
    let result = prop != null ? prefixes[prop] : null
    return result !== undefined ? result : prop
}
