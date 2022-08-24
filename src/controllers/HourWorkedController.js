const HourWorked = require('../models/HourWorked');

class HourWorkedController {
    async create(req, res) {
        const hourWorked = {
            amount_hours: req.body.amount_hours,
            date_job: req.body.date_job,
            id_project: req.body.id_project
        }
        try {
            const result = await HourWorked.create(hourWorked, req.body.id_project);
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
                error: 'Erro interno do servidor'
            });
        }
    }

    async getHourWorkedByIdProject(req, res) {
        const idProject = req.body.idProject;
        try {
            const result = await HourWorked.getHourWorkedByIdProject(idProject);

            if (result.status) {
                res.status(200);
                res.json({
                    data: result.data
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
                error: 'Erro interno do servidor!'
            });
        }
    }

    async getTotalHoursWorked(req, res) {
        const idProject = req.body.idProject;
        try {
            const result = await HourWorked.getTotalHoursWorked(idProject);
            if (result.status) {
                res.status(200);
                res.json({
                    data: result.data
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

module.exports = new HourWorkedController();