const Technology = require('../models/Technology');

class TechnologyController {
    async create(req, res) {
        const technology = {
            name: req.body.name,
            grade_knowledge: req.body.grade_knowledge,
            id_project: req.body.id_project
        }
        try {
            const result = await Technology.create(technology, req.body.id_project);
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
            res.status(400);
            res.json({
                error: 'Erro interno do servidor'
            });
        }
    }

    async getTechnologyByProject(req, res) {
        const idProject = req.body.idProject;
        try {
            const result = await Technology.getTechnologyByIdProject(idProject);

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

    async remove(req, res) {
        const id = req.body.id;
        try {
            const result = await Technology.remove(id);
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
                error: 'Erro interno do servidor!'
            });
        }
    }
}

module.exports = new TechnologyController();