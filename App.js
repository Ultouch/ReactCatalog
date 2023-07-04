import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Ionicons
                name="add"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
                onPress={() => {
                  navigation.navigate('add');
                }}
              />
            ),
          })}
        />
        <Stack.Screen 
          name="add" 
          component={Add} 
        />
        <Stack.Screen 
          name="edit"
          component={Edit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    paddingTop: 45,
    backgroundColor: '#EEEEEE'
  }
});
