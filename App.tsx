import HomeScreen from '~/screens/HomeScreen';
import AddDividaScreen from '~/screens/AddDividaScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddDivida" component={AddDividaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}