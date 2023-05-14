import { connectDB } from "../server.js"

const requiredFieldCreate = ["name", "type", "description"];
const requiredFieldUpdate = ["_id", "name", "type", "description"];

export const getDevice = async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            res.send("Missing id");
        }

        let query = `SELECT * FROM devices WHERE _id = ${id}`;

        connectDB.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }
    catch (err) {
        res.send(err);
    }
}

export const getDevices = async (req, res) => {
    try {
        let query = `SELECT * FROM devices`;

        connectDB.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }
    catch (err) {
        res.send(err);
    }
}

export const createDevice = async (req, res) => {
    try {
        let body = req.body;

        if (!body) {
            res.send("Body is empty");
        }

        requiredFieldCreate.forEach(field => {
            if (!body[field]) {
                res.send(`Missing ${field}`);
            }
        })

        let query = `INSERT INTO devices (name, type, description) VALUES ('${body.name}', '${body.type}', '${body.description}')`;

        connectDB.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    }
    catch (err) {
        res.send(err);
    }
}

export const updateDevice = async (req, res) => {
    try {
        let body = req.body;

        if (!body) {
            res.send("Body is empty");
        }

        requiredFieldUpdate.forEach(field => {
            if (!body[field]) {
                res.send(`Missing ${field}`);
            }
        })

        let query = `UPDATE devices SET name = '${body.name}', type = '${body.type}', description = '${body.description}' WHERE _id = ${body._id}`;

        connectDB.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }
    catch (err) {
        res.send(err);
    }
}

export const deleteDevice = async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            res.send("Missing id");
        }

        let query = `DELETE FROM devices WHERE _id = ${id}`;

        connectDB.query(query, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        })
    }
    catch (err) {
        res.send(err);
    }
}
