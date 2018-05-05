const md5 = require('blueimp-md5')

module.exports = function(value = '', prefix = '', length = 8) {
    return prefix + md5(value, Date.now()).slice(0, length)
}
