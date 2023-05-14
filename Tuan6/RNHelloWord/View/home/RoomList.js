import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from "axios";

export default function RoomList({ navigation }) {
    const api = 'http://localhost:5555/'

    const getRoom = (name, stateFunction) => {
        axios.get(api + name).then(res => { stateFunction(res.data) }).catch(console.log)
    }

    const updateRoom = (name, state, stateFunction) => {
        stateFunction(state);
        axios.put(api + name, {
            fan: state.fan,
            light: state.light,
        }).catch(console.log)
    }

    const navigate = (route) => {
        navigation.navigate('Detail', {
            name: route,
            get: getRoom,
            update: updateRoom,
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Room
                    name="Living Room"
                    img={require('../../assets/icon.png')}
                    routeName="living"
                    navigate={navigate}
                />

                <Room
                    name="Kitchen"
                    img={require('../../assets/icon.png')}
                    routeName="kitchen"
                    navigate={navigate}
                />

                <Room
                    name="Bedroom"
                    img={require('../../assets/icon.png')}
                    routeName="bed"
                    navigate={navigate}
                />
            </View>
        </View>
    );
}

function Room(props) {
    const { name, img, routeName, navigate, navigation } = props;

    return (
        <View style={styles.element}>
            <TouchableOpacity style={styles.btn} onPress={() => { navigate(routeName) }}>
                <Image source={img} style={styles.image} />
                <View style={styles.absoluteView}>
                    <Text>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    element: {
        marginBottom: '1rem'
    },

    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },

    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    btn: {
        width: 30,
        height: 30,
    },

    image: {
        width: "100%",
        height: "100%",
    }
});