import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoomList from './View/home/RoomList';
import DetailRoom from './View/home/components/DetailRoom';
import { Tab } from 'react-native-elements';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RoomList" component={RoomList} />
        <Stack.Screen name="Detail" component={DetailRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

