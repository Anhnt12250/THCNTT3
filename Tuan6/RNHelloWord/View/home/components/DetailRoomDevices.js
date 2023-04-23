import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

export default function DetailRoomDevices(props) {
    const { room, devices, name, updateRoom } = props;

    const handleUpdate = (array, item, callback) => {
        let temp = array.find(element => element.name === item.name);
        temp.status = !temp.status;
        callback({ fan: room.fan, light: room.light });
    }

    return (
        <View>
            <Text style={styles.title}>{name}: </Text>
            {devices.map((item, index) => {
                return (
                    <View key={index} style={styles.device}>
                        <Text>{item.name}:</Text>
                        <Switch
                            value={item.status}
                            onValueChange={() => { handleUpdate(devices, item, updateRoom) }}
                        />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: '1.25rem',
    },

    device: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});