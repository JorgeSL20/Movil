import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import UserScreen from './screens/UserScreen';

import * as Sentry from "@sentry/react-native";

// Inicializa Sentry
Sentry.init({
  dsn: "https://74b71162cd8239d7efd7e673f26301f2@o4508439367778304.ingest.us.sentry.io/4508439489347584",
  tracesSampleRate: 1.0,
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          Sentry.addBreadcrumb({
            category: "navigation",
            message: "User logged out",
            level: "info",
          });
          navigation.navigate('Login');
        },
      })}
      options={{ title: 'Cerrar Sesión' }}
    />
  </Tab.Navigator>
);

function App() {
  // Función para generar un error intencionalmente
  const generateError = () => {
    throw new Error("Este es un error de prueba para Sentry");
  };



  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state?.routes[state.routes.length - 1]?.name;

        if (currentRoute) {
          Sentry.addBreadcrumb({
            category: "navigation",
            message: `Navigated to ${currentRoute}`,
            level: "info",
          });

          // Puedes usar captureMessage para enviar eventos importantes a Sentry
          Sentry.captureMessage(`User navigated to ${currentRoute}`);
        }
      }}
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);
