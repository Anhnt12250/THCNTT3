import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoomList from './View/home/RoomList';
import DetailRoom from './View/home/components/DetailRoom';

import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="RoomList" component={RoomList} options={headerStyle} />
        <Stack.Screen name="Detail" component={DetailRoom} options={headerStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center'
}




