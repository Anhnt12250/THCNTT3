import AsyncStorage from "@react-native-async-storage/async-storage";

export const listUsers = {
    "E4 20 24 2A": { name: "Nguyễn Văn A" },
    "59 A0 B7 B8": { name: "Nguyễn Văn B" },
}

export const storageConfig = {
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
}

export const firebaseConfig = {
    apiKey: "AIzaSyCVdpIR7cGZkRKWlkhM3gZYWGblQ6JzNiw",
    authDomain: "testing-before-changing.firebaseapp.com",
    projectId: "testing-before-changing",
    storageBucket: "testing-before-changing.appspot.com",
    messagingSenderId: "897552891749",
    appId: "1:897552891749:web:8c7eee757c72f38ef6eb8c",
    measurementId: "G-P7EB5NP61M"
};

export const mqttOptions = {
    host: "broker.emqx.io",
    port: 8083,
    path: "/thcntt3",
    id: "id_" + parseInt(Math.random() * 100000),
};