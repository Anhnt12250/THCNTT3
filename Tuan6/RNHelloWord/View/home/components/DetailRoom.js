import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

import DetailRoomDevices from './DetailRoomDevices';

export default function DetailRoom({ route, navigation }) {
    const { name, get, update } = route.params;
    const [room, setRoom] = useState({});

    useEffect(() => {
        navigation.setOptions({ title: name });
        get(name, setRoom);
    }, [])

    const updateRoom = (state) => {
        update(name, state, setRoom);
    }

    return (
        <>
            <View style={styles.container}>
                {room.light === undefined ? <></> :
                    <DetailRoomDevices
                        room={room}
                        devices={room.light}
                        name="Lights"
                        updateRoom={updateRoom} />
                }

                {room.fan === undefined ? <></> :
                    <DetailRoomDevices
                        room={room}
                        devices={room.fan}
                        name="Fans"
                        updateRoom={updateRoom} />}

                {(room.fan === undefined && room.light === undefined) && <Text>Loading</Text>}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});