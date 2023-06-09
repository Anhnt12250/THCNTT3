import { database } from "../server.js";
import { v4 as uuidv4 } from 'uuid';

//register user here
const registeredUsers = {
    "E4 20 24 2A": "Nguyen Van A",
    "59 A0 B7 B8": "Nguyen Van B",
    "D4 BD 28 2A": "Nguyen Van C"
}

export const getUser = async (rfid) => {
    const reference = database.collection("users").doc(rfid);
    const snapshot = await reference.get();
    const data = snapshot.data();

    if (data === undefined) {
        return null;
    } else {
        return data;
    }
}

export const getUsers = async () => {
    const reference = database.collection("users");
    const snapshot = await reference.get();
    const data = snapshot.docs.map(doc => doc.data());
    return data;
}

export const updateUserStatus = async (rfid) => {
    const reference = database.collection("users").doc(rfid);
    let isValidUser = false;

    await reference.get().then((snapshot) => {
        const data = snapshot.data();

        if (data === undefined) {
            if (registeredUsers[rfid] === undefined) {
                console.log("unknown user");
            } else {
                reference.set({ rfid, status: false, uid: uuidv4(), name: registeredUsers[rfid] });
                console.log(`created new user with rfid: ${rfid} and name: ${registeredUsers[rfid]}`);
            }
        } else {
            reference.update({ status: !data.status });
            console.log("updated user status");
            isValidUser = true;
        }
    });

    if (isValidUser) {
        return rfid;
    } else {
        return null;
    }
}

export const deleteUser = async (rfid) => {
    const reference = database.collection("users").doc(rfid);
    const snapshot = await reference.get();
    const data = snapshot.data();

    if (data === undefined) {
        return null;
    } else {
        reference.delete();
        return data;
    }
}
