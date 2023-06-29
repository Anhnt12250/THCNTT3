const topicRFID = "hntt/thcntt3/rfid"
const topicRFIDApp = "hntt/thcntt3/rfid/app"

const topicAdmin = "hntt/thcntt3/rfid/admin"

const topicAdminDelete = "hntt/thcntt3/rfid/admin/delete"



import { updateUserStatus, deleteUser } from './repo.js';

export const mqttOnConnect = (client) => {
    console.log("connected to mqtt broker");

    client.subscribe(topicRFID, { qos: 1 }, null)
    client.subscribe(topicAdminDelete, { qos: 1 }, null)
    client.subscribe(topicRFIDApp, { qos: 1 }, null)
}

export const mqttOnMessage = (mqtt, topic, payload) => {
    const payloadString = payload.toString()
    const topicString = topic.toString()

    console.log(`Topic: ${topicString}`);
    console.log(`Payload: ${payloadString}`);

    switch (topicString) {
        case topicRFID:
            updateUserStatus(payloadString).then(() => {
                mqtt.publish(topicAdmin, payloadString, { qos: 1 }, null)
            });
            break;

        case topicRFIDApp:
            updateUserStatus(payloadString).then((result) => {
                if (result !== null) {
                    mqtt.publish(topicRFIDApp + "/response", "Updated user", { qos: 1 }, null)
                    mqtt.publish(topicAdmin, payloadString, { qos: 1 }, null)
                } else {
                    mqtt.publish(topicRFIDApp + "/response", "User not registered", { qos: 1 }, null)
                    mqtt.publish(topicAdmin, payloadString, { qos: 1 }, null)
                }
            });
            break;

        case topicAdminDelete:
            deleteUser(payloadString).then(() => {
                mqtt.publish(topicAdmin, payloadString, { qos: 1 }, null)
            });
            break;


        default:
            break;
    }


}

