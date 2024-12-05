import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://proyectogatewayback-production.up.railway.app/';

const LoginService = {
  async getUserByEmail(email) {
    try {
      const response = await axios.get(`${BASE_URL}auth/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },

  async getDataUser(id) {
    try {
      const response = await axios.get(`${BASE_URL}auth/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data by ID:', error);
      throw error;
    }
  },

  async crearUsuario(userNew) {
    try {
      const response = await axios.post(`${BASE_URL}auth`, userNew);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async cambiarPassword(newPassword, email) {
    try {
      const response = await axios.patch(`${BASE_URL}auth/password/${email}`, newPassword);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  async checkEmail(dataEmail) {
    try {
      const response = await axios.post(`${BASE_URL}recuperar-pass`, dataEmail);
      return response.data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  },

  async validarUsuario(credentials) {
    try {
      const response = await axios.post(`${BASE_URL}login`, credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('token', String(response.data.token)); // Convertir a string antes de guardar
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Función para obtener información del usuario
  async getDataInformacion(id) {
    try {
      const response = await axios.get(`${BASE_URL}auth/informacion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  },

  // Función para actualizar información del usuario
  async updateInformacion(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}auth/informacion/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user information:', error);
      throw error;
    }
  },

  // Función para obtener preguntas de seguridad del usuario
  async getPreguntas(id) {
    try {
      const response = await axios.get(`${BASE_URL}auth/preguntas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user questions:', error);
      throw error;
    }
  },

  // Función para actualizar una pregunta de seguridad
  async updatePreguntas(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}auth/preguntas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user question:', error);
      throw error;
    }
  },

  // Función para eliminar una pregunta de seguridad
  async deletePregunta(id) {
    try {
      const response = await axios.delete(`${BASE_URL}auth/preguntas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user question:', error);
      throw error;
    }
  },

  // Función para crear una nueva pregunta de seguridad
  async createPreguntas(data) {
    try {
      const response = await axios.post(`${BASE_URL}auth/preguntas/`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating user question:', error);
      throw error;
    }
  },

  // Función para actualizar el perfil del usuario
  async updateUser(id, data) {
    try {
      const response = await axios.patch(`${BASE_URL}auth/perfil/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Función para obtener un usuario por su ID
  async getUserById(id) {
    try {
      const response = await axios.get(`${BASE_URL}users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  async logout() {
    await AsyncStorage.removeItem('token');
  },

  async isLoggedIn() {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  },
};

export default LoginService;
