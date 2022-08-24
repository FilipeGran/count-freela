const knex = require('../database/connection');
const Project = require('../models/Project');

class Technology {
    async create(technology, idProject) {
        const isValidProject = await Project.getProjectById(idProject);

        if (isValidProject.length > 0) {
            try {
                await knex.insert(technology).table('technology');
                return {
                    status: true,
                    message: 'Tecnologia adicionada com sucesso!'
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao inserir dados, verifique os dados informados!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Projeto informado não existe!'
            }
        }
    }

    async getTechnologyByIdProject(idProject) {
        const isValidProject = await Project.getProjectById(idProject);

        if (isValidProject.length > 0) {
            try {
                const result = await knex.select('*').where({
                    id_project: idProject
                }).table('technology');

                return {
                    status: true,
                    data: result
                }

            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao consultar dados!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Projeto não existe!'
            }
        }
    }

    async getTechnology(id) {
        try {
            const result = await knex.select('*').where({
                id
            }).table('technology');

            if (result.length > 0) {
                return true;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async remove(id) {
        const isValidId = await this.getTechnology(id);
        if (isValidId) {
            try {
                await knex.delete().where({
                    id
                }).table('technology');
                return {
                    status: true,
                    message: 'Deletado com Sucesso!'
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao deletar dado!'
                }
            }
        } else {
            return {
                status: false,
                error: 'Id informado não é Inválido'
            }
        }
    }
}

module.exports = new Technology();