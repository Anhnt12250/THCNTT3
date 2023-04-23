import { database } from '../server.js'

export const getBed = async (req, res) => {
    const reference = database.collection("devices").doc("bed")
    const snapshot = await reference.get();

    if (snapshot.exists) {
        res.send(snapshot.data());
    } else {
        res.send("No data available");
    }
}

export const updateBed = async (req, res) => {
    const reference = database.collection("devices").doc("bed");
    const snapshot = await reference.get();

    if (snapshot.exists) {
        await reference.update(req.body);
        res.send("Updated");
    } else {
        res.send("No data available");
    }
}