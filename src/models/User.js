const Bcrypt = require('../util/Bcrypt');
const Knex = require('../database/connection');

class User {
    async create(user, password) {
        try {
            user.password = Bcrypt.encrypt(password);
            await Knex.insert(user).into('user');
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllUsers() {
        try {
            return await Knex.select('*').table('user');
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getByEmail(email) {
        try {
            let user = await Knex.select('*').where({
                email
            }).table('user');

            if (user !== undefined || user !== null) {
                return user;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getById(id) {
        try {
            let user = await Knex.select('*').where({
                id
            }).table('user');
            if (user !== undefined || user !== null) {
                return user;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async update(userClient) {
        let user = await this.getById(userClient.id);

        if (user.length !== undefined) {
            let userEdit = {};

            if (userClient.name !== undefined) {
                userEdit.name = userClient.name;
            }

            if (userClient.email !== undefined) {
                userEdit.email = userClient.email;
            }

            if (userClient.cpf !== undefined) {
                userEdit.cpf = userClient.cpf;
            }

            try {
                await Knex.update(userEdit).where({
                    id: userClient.id
                }).table('user');
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }

        } else {
            return false;
        }
    }
}

module.exports = new User();