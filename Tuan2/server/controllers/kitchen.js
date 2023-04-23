import { database } from '../server.js'

export const getKitchen = async (req, res) => {
    const reference = database.collection("devices").doc("kitchen")
    const snapshot = await reference.get();

    if (snapshot.exists) {
        res.send(snapshot.data());
    } else {
        res.send("No data available");
    }
}

export const updateKitchen = async (req, res) => {
    const reference = database.collection("devices").doc("kitchen");
    const snapshot = await reference.get();

    if (snapshot.exists) {
        await reference.update(req.body);
        res.send("Updated");
    } else {
        res.send("No data available");
    }
}