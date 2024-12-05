import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native'; // Se agregó `Image`
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import loginService from '../services/LoginService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log("Inicio de sesión iniciado");

    const fecha = new Date().toISOString();
    let ip = '127.0.0.1';

    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      ip = response.data.ip;
    } catch (error) {
      console.error("Error al obtener la IP:", error);
    }

    try {
      const response = await loginService.validarUsuario({ email, password, fecha, ip });

      if (response.token) {
        const token = response.token.toString();
        await AsyncStorage.setItem('token', token);
        navigation.navigate('HomeTabs', {
          screen: 'HomeTab',
          params: { role: response.role },
        });
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Intente más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen añadida */}
      <Image source={require('../assets/logoazul.png')} style={styles.logo} />

      <Text style={styles.title}>Inicio de Sesión</Text>

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Text style={styles.togglePassword}>{passwordVisible ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Regístrate
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  logo: {
    width: 150, // Ancho de la imagen
    height: 150, // Alto de la imagen
    resizeMode: 'contain', // Ajustar tamaño proporcionalmente
    alignSelf: 'center', // Centrar horizontalmente
    marginBottom: 20, // Espacio debajo de la imagen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  togglePassword: {
    color: 'blue',
    marginLeft: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
  },
});

export default LoginScreen;
