const omit = require('../.utils/omit')
const excludeAttrs = ['id', 'display', 'visibility']

module.exports = function(frame) {
    frame.attributes = omit(frame.attributes, excludeAttrs)
    return frame
}
