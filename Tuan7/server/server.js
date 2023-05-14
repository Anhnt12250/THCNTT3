import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as mysql from 'mysql';

import { getDevice, getDevices, createDevice, updateDevice, deleteDevice } from './controllers/device.js';

//initialize
const app = express();

const routerDevice = express.Router();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

export const connectDB = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    insecureAuth: true,
    database: 'devices'
});

const handleConnection = (err) => {
    if (err) {
        console.log("Can not connect to database");
        console.log(err);
        return;
    };

    console.log("Connected!!!")
}

connectDB.connect(handleConnection);

//controller
routerDevice.get('/', getDevices);
routerDevice.post('/', createDevice);
routerDevice.put('/', updateDevice);
routerDevice.delete('/', deleteDevice);

app.use('/device', routerDevice);

//server
const server = app.listen(5555, () => {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

