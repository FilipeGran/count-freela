const express = require('express');
const app = express();
const router = require('./router/Routes');
const cors = require('cors');

// configuration body-parser

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.use(cors());

app.use('/', router);

app.listen(8080, () => {
    console.log('API Rodando!');
});