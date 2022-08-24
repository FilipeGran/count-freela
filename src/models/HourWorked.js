const knex = require('../database/connection');
const Project = require('../models/Project');

class HourWorked {
    async create(hourWorked, idProject) {
        const isValidProject = await Project.getProjectById(idProject);

        if (isValidProject.length > 0) {
            try {
                await knex.insert(hourWorked).table('hours_worked');
                return {
                    status: true,
                    message: 'Adicionado com Sucesso!'
                }
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao inserir dados'
                }
            }
        } else {
            return {
                status: false,
                error: 'Id do projeto informado não exite!'
            }
        }
    }

    async getHourWorkedByIdProject(idProject) {
        const isValidProject = await Project.getProjectById(idProject);
        if (isValidProject.length > 0) {
            try {
                const result = await knex.select('*').where({
                    id_project: idProject
                }).table('hours_worked');

                if (result.length > 0) {
                    return {
                        status: true,
                        data: result
                    }
                } else {
                    return {
                        status: false,
                        error: 'Nenhum dado encontrado'
                    }
                }

            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    error: 'Erro ao realizar consulta'
                }
            }
        } else {
            return {
                status: false,
                error: 'Projeto não encontrado!'
            }
        }
    }

    async getTotalHoursWorked(idProject) {
        const getHours = await this.getHourWorkedByIdProject(idProject);

        if (getHours.status) {
            let totalHours = 0;

            getHours.data.forEach(element => {
                totalHours += element.amount_hours;
            });

            return {
                status: true,
                data: totalHours
            }

        } else {
            return {
                status: false,
                error: getHours.error
            }
        }
    }
}

module.exports = new HourWorked();