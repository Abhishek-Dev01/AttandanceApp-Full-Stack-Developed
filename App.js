import Onboard from './screens/Onboard';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import Forgot from './screens/Forgot';
import OutputScreen from './screens/OutputScreen';



const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Onboard" component={Onboard}   options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot}options={{ headerShown: false }} />
        <Stack.Screen name="OutputScreen" component={OutputScreen}options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

