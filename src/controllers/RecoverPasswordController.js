const RecoverPassword = require('../models/RecoverPassword');

class RecoverPasswordController {
    async createrecover(req, res) {
        const email = req.body.email;
        try {
            const result = await RecoverPassword.createRecover(email);
            if (result.status) {
                res.status(200);
                res.json({
                    code: result.code
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

    async recoverPassword(req, res) {
        const {
            id_user,
            code,
            newPassword
        } = req.body;
        try {
            const result = await RecoverPassword.recoverPassword(id_user, code, newPassword);
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

module.exports = new RecoverPasswordController();