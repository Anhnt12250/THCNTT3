import React, { useEffect, useState } from "react";
import { Text, View, Modal, StyleSheet, Pressable, TextInput } from "react-native";
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, getDocs, getDoc, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

import init from "react_native_mqtt";
import Status from "./src/status";

import { MQTT } from "./src/service";
import { storageConfig, mqttOptions, firebaseConfig } from "./src/config";

init(storageConfig);
export const mqtt = new MQTT(mqttOptions);

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const usersCollection = collection(firebaseDB, 'users');

const App = () => {
  const [users, setUsers] = useState([]);
  const [rfid, setRFID] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    mqtt.connect();
    mqtt.setOnMessageArrived(onMessageArrived);
    getUsers();

    onSnapshot(usersCollection, (querySnapshot) => {
      let tempUsers = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          callbackDelete: async () => { await deleteDoc(doc.ref); }
        }
      });
      setUsers(tempUsers);
    })

  }, []);

  const onMessageArrived = async (m) => {
    let tempRFID = m.payloadString;
    setRFID(tempRFID);
    const targetDoc = doc(firebaseDB, 'users', tempRFID);

    getDoc(targetDoc).then(async (docSnap) => {
      let infoUser = docSnap.data();

      if (docSnap.exists()) {
        await updateDoc(targetDoc, { status: !infoUser.status });
      } else {
        setModalVisible(!modalVisible);
      }
    })
  }

  const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    let tempUsers = querySnapshot.docs.map(doc => doc.data());
    setUsers(tempUsers);
  }

  const handleOnCloseModal = () => {
    setModalVisible(!modalVisible);

    if (text === '') return;
    const targetDoc = doc(firebaseDB, 'users', rfid);
    setDoc(targetDoc, { name: text, rfid, status: false }).then(() => { setText(''); });
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => { handleOnCloseModal(); }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <Text style={styles.modalTitle}>Create New User</Text>
            <TextInput
              style={[styles.text, styles.modalInput]}
              placeholder="new name"
              onChangeText={setText}
              value={text}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => { handleOnCloseModal(); }}>
              <Text style={styles.text}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    textAlign: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#111",
    color: "#fff",
  },
  modalWrapper: {
    padding: 40,
    backgroundColor: "#222",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  modalInput: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "#fff",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: "center",
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

