import React from 'react'
import { Text, View, StyleSheet } from "react-native";

export default function Status({ user }) {
    return (
        <View style={[styles.box, user.status ? styles.green : styles.red]}>
            <Text style={styles.text}>
                {user.name} - {user.status ? "ONLINE" : "OFFLINE"}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        padding: 10,
        borderRadius: 10,
        backgroundColor: "#333",

        margin: 10,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    red: {
        shadowColor: "#FF4F2A",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    green: {
        shadowColor: "#2DFF35",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
})
