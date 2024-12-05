import axios from 'axios';

// Definimos la URL base del servicio
const url = 'https://proyectogatewayback-production.up.railway.app/producto';

class ProductoService {
  // Obtener productos ordenados por fecha (ascendente o descendente)
  obtenerProductos(order = 'desc') {
    return axios
      .get(`${url}?_sort=fecha&_order=${order}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al obtener productos:', error);
        throw error;
      });
  }

  // Obtener un producto por su ID
  obtenerProductoPorId(id) {
    return axios
      .get(`${url}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error al obtener el producto con ID ${id}:`, error);
        throw error;
      });
  }

  // Crear un nuevo producto
  crearProducto(newProducto) {
    return axios
      .post(url, newProducto)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al crear el producto:', error);
        throw error;
      });
  }

  // Actualizar un producto por su ID
  actualizarProducto(id, formData) {
    return axios
      .put(`${url}/${id}`, formData)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error al actualizar el producto con ID ${id}:`, error);
        throw error;
      });
  }

  // Eliminar un producto por su ID
  eliminarProducto(id) {
    return axios
      .delete(`${url}/${id}`)
      .then(() => {})
      .catch((error) => {
        console.error(`Error al eliminar el producto con ID ${id}:`, error);
        throw error;
      });
  }
}

export default new ProductoService();
