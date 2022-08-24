const User = require('../models/User');
const Knex = require('../database/connection');
const {
    v4: uuid
} = require('uuid');
const Bcrypt = require('../util/Bcrypt');

class RecoverPassword {
    async createRecover(email) {
        const user = await User.getByEmail(email);
        if (user !== undefined) {
            const code = uuid();
            try {
                await Knex.insert({
                    code: code,
                    id_user: user[0].id,
                    used: false
                }).table('recover_password');
                return {
                    status: true,
                    code: code,
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao Salvar Operação'
                }
            }
        } else {
            return {
                status: false,
                error: 'Usuário não encontrado na base de dados!'
            }
        }
    }

    async getRecoverByCode(code) {
        try {
            const result = await Knex.select('*').where({
                code
            }).table('recover_password');

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async recoverPassword(id_user, code, newPassword) {
        const recover = await this.getRecoverByCode(code);
        if (recover !== undefined) {
            if (!recover.used) {
                try {
                    const result = await User.updatePassword(id_user, newPassword);
                    if (result.status) {
                        await Knex.update({
                            used: true
                        }).where({
                            code
                        }).table('recover_password');
                        return {
                            status: true,
                            message: 'Senha Atualizada com Sucesso!'
                        }
                    } else {
                        return {
                            status: false,
                            error: result.error
                        }
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        status: false,
                        error: 'Erro ao atualizar senha!'
                    }
                }
            } else {
                return {
                    status: false,
                    error: 'Código de recuperação já foi utilizado!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Código de recuperação inválido!'
            }
        }
    }
}

module.exports = new RecoverPassword();