const SVGO = require('svgo')
const config = require('./.internal/svgo.json')

module.exports = function(data) {
    const svgo = new SVGO(config)
    return new Promise((resolve, reject) => {
        svgo
            .optimize(data)
            .then(result => resolve(result.data))
            .catch(err => reject(err))
    })
}
