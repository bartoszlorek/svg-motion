const fs = require('fs')

module.exports = function(path, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}
