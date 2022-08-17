const bcrypt = require('bcrypt');

class Bcrypt {
    static encrypt(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    static comparePassword(password, passwordDB) {
        if (password !== undefined) {
            let isPassword = bcrypt.compareSync(password, passwordDB);
            if (isPassword) {
                return true;
            } else {
                return false;
            }
        } else {
            return undefined;
        }
    }
}

module.exports = Bcrypt;