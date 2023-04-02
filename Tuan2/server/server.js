const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');

const cors = require('cors');
var app = express();

//initialize
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const connectDB = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    insecureAuth: true,
    database: 'thcntt3'
});

handleConnection = (err) => {
    if (err) {
        console.log("Can not connect to database");
        console.log(err);
        return;
    };

    console.log("Connected!!!")
}

connectDB.connect(handleConnection);

//RESTFull API
app.get('/get-all-farms', function (req, res) {
    try {
        connectDB.query(
            'SELECT * FROM thcntt3.farms',
            (err, result, fields) => {
                if (err) {
                    res.send(err);
                    return;
                };

                res.send(result);
            });
    }
    catch (err) {
        res.send(err);
    }
})

//server
const server = app.listen(5555, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
