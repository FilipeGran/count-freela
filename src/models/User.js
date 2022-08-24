const Bcrypt = require('../util/Bcrypt');
const Knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const secret = 'testsecret';

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
        return {
            status: true,
            message: 'Api rodando!'
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

    async updatePassword(id, newPassword) {
        try {
            const hash = Bcrypt.encrypt(newPassword);
            const result = await Knex.update({
                password: hash
            }).where({
                id
            }).table('user');
            return {
                status: true,
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                error: 'Erro ao atualizar senha!'
            }
        }
    }

    async login(email, password) {
        try {
            const user = await this.getByEmail(email);
            if (user !== undefined) {
                const isEqualPassword = Bcrypt.comparePassword(password, user[0].password);
                if (isEqualPassword) {
                    const tokenAuth = jwt.sign({
                        idUser: user[0].id,
                        name: user[0].name,
                        email: user[0].email
                    }, secret);
                    return {
                        status: true,
                        token: tokenAuth
                    }
                } else {
                    return {
                        status: false,
                        error: 'Senha inválida!'
                    }
                }
            } else {
                return {
                    status: false,
                    error: 'Usuário não existe no banco de dados!'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                error: 'Erro ao consultar usuário pelo email'
            }
        }
    }
}

module.exports = new User();