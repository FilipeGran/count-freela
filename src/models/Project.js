const knex = require('../database/connection');
const User = require('../models/User');

class Project {
    async create(project) {
        const isUserValid = await User.getById(project.id_user);

        if (isUserValid !== undefined) {
            try {
                await knex.insert(project).table('project');
                return {
                    status: true
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao salvar no banco de dados, verifique os dados informados!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Usuário informado não existe'
            }
        }
    }

    async getAllByIdUser(idUser) {
        try {
            let result = await User.getById(idUser);
            if (result !== undefined) {
                let consult = await knex.select('*').where({
                    id_user: idUser
                }).table('project');
                return {
                    status: true,
                    data: consult
                };
            } else {
                return {
                    status: false,
                    error: 'Usuário não existe na base de dados!'
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: false
            }
        }
    }

    async getProjectById(id) {
        try {
            let res = await knex.select('*').where({
                id
            }).table('project');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async setFinished(idProject) {
        let result = await this.getProjectById(idProject);

        if (result.length > 0) {
            try {
                await knex.update({
                    finished: true
                }).where({
                    id: idProject
                }).table('project');
                return {
                    status: true,
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao atualizar dados!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Projeto não Existe!'
            }
        }
    }

    async isFinished(id) {
        try {
            let result = await knex.select('finished').where({
                id
            }).table('project');
            if (result[0]) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateValueTotal(idProject, hourValue, totalHour) {
        let result = await this.getProjectById(idProject);

        if (result.length > 0) {
            const isFinished = await this.isFinished(idProject);
            if (!isFinished) {
                const valueTotal = hourValue * totalHour;
                try {
                    await knex.update({
                        value_total: valueTotal
                    }).where({
                        id: idProject
                    }).table('project');
                    return {
                        status: true,
                        message: 'Valor total atualizado com sucesso!'
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        status: false,
                        error: 'Erro ao tentar atualizar valor do projeto!'
                    }
                }
            } else {
                return {
                    status: false,
                    error: 'Projeto já finalizado!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Projeto informado não existe'
            }
        }
    }
}

module.exports = new Project();