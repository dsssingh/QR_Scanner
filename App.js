import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Scanner from './Screens/Scanner';
import { ScanHistoryProvider } from './ScanHistoryContext';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <ScanHistoryProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Scanner" component={Scanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScanHistoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
     justifyContent: 'center',
  },
});
