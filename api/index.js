const express = require('express')
const mysql = require('mysql2')

const PORT = 4000
const HOST = '0.0.0.0'
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap'
})

connection.connect((err) => {
    if (err) {
        console.error('erro ao conectar', err)
        return;
    }

    console.log('conectado');
})

app.get('/', (req, res) => {
    const query = "select id, name, price from products;"
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.error('Error na query', err);
            return;
        }
        const products = result.map((item) => ({
            id: item.id,
            nome: item.name,
            preco: item.price
        }));
        res.status(200).send(products)
    });

    //res.status(200).send("Executando locamente...");
});

app.listen(PORT, HOST)