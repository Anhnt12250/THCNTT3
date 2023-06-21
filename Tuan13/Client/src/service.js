export class MQTT {
    constructor(options) {
        this.topic = "hntt/thcntt3/rfid";
        this.client = new Paho.MQTT.Client(options.host, options.port, options.path);
    }

    setOnMessageArrived = (callback) => {
        this.client.onMessageArrived = callback;
    }

    handleOnConnectSuccess = () => {
        console.log("Connected to MQTT broker");
        console.log("Subscribing to topic...", this.topic);
        this.subscribeTopic();
    }

    handleOnConnectFailure = () => {
        console.log("Connect failed");
        console.log("Reconnecting...");
        this.connect();
    }

    connect = () => {
        this.client.connect({
            useSSL: false,
            timeout: 5,
            onSuccess: this.handleOnConnectSuccess,
            onFailure: this.handleOnConnectFailure,
        });
    }

    subscribeTopic = () => {
        this.client.subscribe(this.topic, { qos: 1 });
    };
}