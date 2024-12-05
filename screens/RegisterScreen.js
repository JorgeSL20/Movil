// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      // Simulamos el registro exitoso (puedes reemplazar esto con el servicio real)
      console.log('Registrado:', { email, password });
      
      // Alerta de confirmación para el usuario
      Alert.alert('Registro Exitoso', 'Tu cuenta ha sido creada. Inicia sesión para continuar.');
      
      // Navega a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen añadida */}
      <Image source={require('../assets/logoazul.png')} style={styles.logo} />

      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 150, // Ancho de la imagen
    height: 150, // Alto de la imagen
    resizeMode: 'contain', // Ajustar tamaño proporcionalmente
    marginBottom: 20, // Espacio debajo de la imagen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default RegisterScreen;
