const chalk = require('chalk')

const api = {
    success: value => {
        console.log(chalk.greenBright(value))
        return true
    },
    error: value => {
        console.log(chalk.redBright(value))
        return false
    },
    comment: value => {
        console.log(chalk.gray(value))
        return api
    },
    label: (prop, value) => {
        console.log(prop + ' ' + chalk.blue(value))
        return api
    }
}

module.exports = api
