const User = require('../models/User');

class UserController {
    async create(req, res) {

        let password = req.body.password;
        let user = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email
        }

        try {
            let isValidEmail = await User.getByEmail(user.email);

            if (isValidEmail.length === 0) {
                let result = await User.create(user, password);
                if (result) {
                    res.status(200);
                    res.json({
                        message: 'Cadastrado com Sucesso!'
                    });
                } else {
                    res.status(406);
                    res.json({
                        error: 'Erro ao Cadastrar'
                    });
                }
            } else {
                res.status(406);
                res.json({
                    error: 'Email já cadastrada na base de dados!',
                })
            }
        } catch (error) {
            console.log(error);
            res.Status(500);
            res.json({
                error: 'Erro interno do Servidor, entre em contato com o Suporte'
            });
        }
    }

    async getAll(req, res) {
        try {
            let result = await User.getAllUsers();
            if (result.status) {
                res.status(200);
                res.json({
                    dados: result.message
                });
            } else {
                res.status(404);
                res.json({
                    error: 'Página não encontrada!'
                });
            }
        } catch (error) {
            console.log(error);
            res.Status(500);
            res.json({
                error: 'Erro interno do Servidor, entre em contato com o Suporte'
            });
        }
    }

    async updateUser(req, res) {
        const user = {
            id: req.body.id,
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email
        }

        try {
            let result = await User.update(user);

            if (result) {
                res.status(200);
                res.json({
                    message: 'Dados Atualizados com Sucessso!'
                });
            } else {
                res.status(404);
                res.json({
                    error: 'Usuário não encontrado!'
                });
            }

        } catch (error) {
            console.log(error);
            res.Status(500);
            res.json({
                error: 'Erro interno do Servidor, entre em contato com o Suporte'
            });
        }
    }

    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        try {
            const result = await User.login(email, password);

            if (result.status) {
                res.status(200);
                res.json({
                    token: result.token
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

module.exports = new UserController();