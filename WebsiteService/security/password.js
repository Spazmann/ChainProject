const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync()
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = (password, hashedpassword) => {
    let isValid = bcrypt.compareSync(password, hashedpassword)
    return isValid
}

module.exports = {
    hashPassword,
    comparePassword
}