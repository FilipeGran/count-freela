const jwt = require('jsonwebtoken');
const secret = 'testsecret';

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken !== undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        try {
            const decoded = jwt.verify(token, secret);
            console.log(decoded);
            next();
        } catch (error) {
            console.log(error);
            res.status(403);
            res.json({
                error: 'Token Inválido!'
            });
        }
    } else {
        res.status(403);
        res.json({
            error: 'É necessário realizar login!'
        });
        return;
    }
}