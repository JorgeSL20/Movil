import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa los íconos

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import UserScreen from './screens/UserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente vacío reutilizable
const EmptyScreen = () => null;

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        // Define el icono según el nombre de la pestaña
        if (route.name === 'HomeTab') {
          iconName = 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'User') {
          iconName = 'person-outline';
        } else if (route.name === 'Logout') {
          iconName = 'log-out-outline';
        }

        // Retorna el ícono con los colores y tamaños proporcionados
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue', // Color activo
      tabBarInactiveTintColor: 'grey', // Color inactivo
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
          navigation.navigate('Login'); // Redirige al login
        },
      })}
      options={{
        title: 'Cerrar Sesión',
      }}
    />
  </Tab.Navigator>
);

export default function App() {
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
