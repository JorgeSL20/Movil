import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginService from '../services/LoginService'; // Asegúrate de que esta ruta sea correcta
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [dataUser, setDataUser] = useState({
    name: '',
    lastNameP: '',
    lastNameM: '',
    email: '',
    pregunta: '',
    respuesta: '',
    role: '',
    url: '', // Aquí irá la URL de la imagen
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const userData = await LoginService.getDataUser(token);
          setDataUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INFORMACIÓN DEL PERFIL</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perfil de Usuario</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}><Text style={styles.label}>Nombre:</Text> {dataUser.name}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Apellido Paterno:</Text> {dataUser.lastNameP}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Apellido Materno:</Text> {dataUser.lastNameM}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Correo Electrónico:</Text> {dataUser.email}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Pregunta para recuperación:</Text> {dataUser.pregunta}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Respuesta para recuperación:</Text> {dataUser.respuesta}</Text>
          {dataUser.url ? (
            <Image source={{ uri: dataUser.url }} style={styles.profileImage} />
          ) : (
            <Text style={styles.infoText}>No hay imagen de perfil disponible</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    borderColor: '#007bff',
    borderWidth: 2,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
