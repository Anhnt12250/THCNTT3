import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
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
                    description="This is a Living Room"
                    routeName="living"
                    navigate={navigate} />

                <Room
                    name="Kitchen"
                    description="This is a Kitchen"
                    routeName="kitchen"
                    navigate={navigate} />

                <Room
                    name="Bedroom"
                    description="This is a Bedroom"
                    routeName="bed"
                    navigate={navigate} />
            </View>
        </View>
    );
}

function Room(props) {
    const { name, description, routeName, navigate } = props;

    return (
        <View style={styles.element}>
            <Text style={styles.title}>{name}</Text>
            <Button
                title={description}
                onPress={() => navigate(routeName)} />
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
    }
});