// services/CartService.js
import axios from 'axios';
import AuthService from './AuthService';
import ProductoService from './ProductoService';

const BASE_URL = 'https://proyectogatewayback-production.up.railway.app/carrito';

const CartService = {
  getAuthHeaders: async () => {
    const token = await AuthService.getToken(); // Obtener token desde el servicio de autenticación
    if (!token) throw new Error('Token no encontrado');
    return { Authorization: `Bearer ${token}` };
  },

  agregarItem: async (productoId, cantidad) => {
    try {
      const producto = await ProductoService.obtenerProductoPorId(productoId);
      const userId = await AuthService.getCurrentUserId();
      if (!userId) throw new Error('Usuario no autenticado');

      const headers = await CartService.getAuthHeaders();
      const data = {
        productoId,
        cantidad,
        userId,
        productoNombre: producto.producto,
        productoPrecioMen: producto.precioMen,
        productoPrecioMay: producto.precioMay,
        productoCantidadMay: producto.cantidadMay,
        url: producto.url,
      };

      const response = await axios.post(`${BASE_URL}/agregar`, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al agregar item al carrito:', error);
      throw error;
    }
  },

  obtenerItemsDelCarrito: async () => {
    try {
      const headers = await CartService.getAuthHeaders();
      const userId = await AuthService.getCurrentUserId();
      if (!userId) throw new Error('Usuario no autenticado');

      const response = await axios.get(`${BASE_URL}/items/${userId}`, { headers });
      const productos = await ProductoService.obtenerProductos();

      // Unir detalles del producto con los datos del carrito
      const itemsConDetalles = response.data.map(item => {
        const producto = productos.find(p => p.id === item.productoId);
        return {
          ...item,
          productoNombre: producto?.producto || 'Desconocido',
          productoImagen: producto?.url || 'https://via.placeholder.com/60',
          productoPrecioMen: producto?.precioMen || 0,
          productoPrecioMay: producto?.precioMay || 0,
          productoCantidadMay: producto?.cantidadMay || 0,
        };
      });

      return itemsConDetalles;
    } catch (error) {
      console.error('Error al obtener items del carrito:', error);
      throw error;
    }
  },

  actualizarCantidad: async (itemId, nuevaCantidad) => {
    try {
      const headers = await CartService.getAuthHeaders();
      const response = await axios.put(`${BASE_URL}/actualizar-cantidad/${itemId}`, { cantidad: nuevaCantidad }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
      throw error;
    }
  },

  eliminarItem: async (itemId) => {
    try {
      const headers = await CartService.getAuthHeaders();
      const response = await axios.delete(`${BASE_URL}/eliminar/${itemId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar item del carrito:', error);
      throw error;
    }
  },

  vaciarCarrito: async () => {
    try {
      const headers = await CartService.getAuthHeaders();
      const userId = await AuthService.getCurrentUserId();
      if (!userId) throw new Error('Usuario no autenticado');

      const response = await axios.delete(`${BASE_URL}/vaciar/${userId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      throw error;
    }
  },

  procesarPago: async () => {
    try {
      const headers = await CartService.getAuthHeaders();
      const userId = await AuthService.getCurrentUserId();
      if (!userId) throw new Error('Usuario no autenticado');

      const response = await axios.post(`${BASE_URL}/procesar-pago/${userId}`, {}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      throw error;
    }
  },

  agregarOActualizarItem: async (item) => {
    try {
      const headers = await CartService.getAuthHeaders();
      const response = await axios.post(`${BASE_URL}/agregar-o-actualizar`, item, { headers });
      return response.data;
    } catch (error) {
      console.error('Error al agregar o actualizar el item:', error);
      throw error;
    }
  },
};

export default CartService;
