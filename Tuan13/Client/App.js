import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, doc, getDocs, getDoc, setDoc, updateDoc, } from 'firebase/firestore';

import init from "react_native_mqtt";
import Status from "./src/status";

import { MQTT } from "./src/service";
import { storageConfig, mqttOptions, firebaseConfig, listUsers } from "./src/config";

init(storageConfig);
export const mqtt = new MQTT(mqttOptions);

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const usersCollection = collection(firebaseDB, 'users');

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    mqtt.connect();
    mqtt.setOnMessageArrived(onMessageArrived);
    getUsers();

    onSnapshot(usersCollection, (querySnapshot) => {
      let tempUsers = querySnapshot.docs.map(doc => doc.data());
      setUsers(tempUsers);
    })

  }, []);

  const onMessageArrived = async (m) => {
    let rfid = m.payloadString;
    const targetDoc = doc(firebaseDB, 'users', rfid);

    getDoc(targetDoc).then(async (docSnap) => {
      let infoUser = docSnap.data();

      if (docSnap.exists()) {
        await updateDoc(targetDoc, { status: !infoUser.status });
      } else {
        await setDoc(targetDoc, { ...listUsers[rfid], rfid, status: false });
      }
    })
  }

  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    let tempUsers = querySnapshot.docs.map(doc => doc.data());
    setUsers(tempUsers);
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Current User Status
        </Text>
        <View>
          {users.map((user, index) => {
            return (
              <Status key={index} user={user} />
            )
          })}
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#111",
  },
  wrapper: {
    padding: 40,
    backgroundColor: "#222",
    borderRadius: 10,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
});

