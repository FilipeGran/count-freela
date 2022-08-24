const Project = require('../models/Project');

class ProjectController {
    async create(req, res) {
        const project = {
            name: req.body.name,
            difficulty: req.body.difficulty,
            deadline: req.body.deadline,
            finished: false,
            hour_value: req.body.hourValue,
            id_user: req.body.idUser,
            value_total: 0
        }

        try {
            let resul = await Project.create(project);
            if (resul.status) {
                res.status(200);
                res.json({
                    message: 'Dados Salvos com Sucesso!'
                });
            } else {
                res.status(400);
                res.json({
                    error: resul.error
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({
                error: 'Erro interno do Servidor!'
            });
        }
    }

    async getProjectByIdUser(req, res) {
        const idUser = req.body.idUser;

        try {
            let result = await Project.getAllByIdUser(idUser);

            if (result.status) {
                res.status(200);
                res.json({
                    data: result.data
                });
            } else {
                res.status(404);
                res.json({
                    error: result.error
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({
                error: 'Erro interno do servidor!'
            });
        }
    }

    async setFinished(req, res) {
        const idProject = req.body.id;

        try {
            let result = await Project.setFinished(idProject);
            if (result.status) {
                res.status(200);
                res.json({
                    message: 'Projeto Finalizado!'
                });
            } else {
                res.status(404);
                res.json({
                    error: 'Projeto não encontrado!'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({
                error: 'Erro interno do servidor!'
            });
        }
    }

    async updateValueTotal(req, res) {
        const {
            idProject,
            hourValue,
            totalHour
        } = req.body;
        try {
            const result = await Project.updateValueTotal(idProject, hourValue, totalHour);
            if (result.status) {
                res.status(200);
                res.json({
                    message: result.message
                });
            } else {
                res.status(400);
                res.json({
                    error: result.error
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json({
                error: 'Erro interno do Servidor!'
            });
        }

    }
}

module.exports = new ProjectController();