import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = {
  async getToken() {
    return await AsyncStorage.getItem('token');
  },

  async getCurrentUser() {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async setUser(user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },

  async getCurrentUserId() {
    // Intentar obtener el ID del usuario desde el token (si el token almacena el ID)
    const token = await this.getToken();
    if (token) {
      const userId = parseInt(token, 10); // Si el token es el ID del usuario
      if (!isNaN(userId)) return userId;
    }

    // Si no está en el token, intentar obtenerlo desde el objeto de usuario almacenado
    const user = await this.getCurrentUser();
    return user ? user.id : null; // Asegúrate de que la estructura del usuario tenga un campo 'id'
  },

  async getCurrentUserEmail() {
    const user = await this.getCurrentUser();
    return user ? user.email : null;
  },

  async getCurrentUserRole() {
    const user = await this.getCurrentUser();
    return user ? user.role : null;
  },
};

export default AuthService;
