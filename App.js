import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa los íconos
import { Text } from 'react-native';



import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import UserScreen from './screens/UserScreen';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://408d81b9692f59b527576740c02aae00@o4508439367778304.ingest.us.sentry.io/4508439796318208',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente vacío reutilizable
const EmptyScreen = () => null;

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'User') {
          iconName = 'person-outline';
        } else if (route.name === 'Logout') {
          iconName = 'log-out-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'grey',
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Inicio' }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrito' }} />
    <Tab.Screen name="User" component={UserScreen} options={{ title: 'Usuario' }} />
    <Tab.Screen
      name="Logout"
      component={EmptyScreen}
      listeners={({ navigation }) => ({
        tabPress: e => {
          e.preventDefault();
          navigation.navigate('Login');
        },
      })}
      options={{
        title: 'Cerrar Sesión',
      }}
    />
  </Tab.Navigator>
);

function App() {
  // Error intencional para probar Sentry
  useEffect(() => {
    try {
      // Lanza un error para probar la integración de Sentry
      throw new Error('My first Sentry error!');
    } catch (error) {
      Sentry.captureException(error); // Captura el error y lo envía a Sentry
    }
  }, []);

  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}


export default Sentry.wrap(App);
