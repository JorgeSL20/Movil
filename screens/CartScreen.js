import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import CartService from '../services/CartService';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const cartItems = await CartService.obtenerItemsDelCarrito();

      const updatedItems = cartItems.map(item => {
        const precioAplicado = item.cantidad >= (item.productoCantidadMay || 0)
          ? item.productoPrecioMay || 0
          : item.productoPrecioMen || 0;

        return { ...item, precioAplicado };
      });

      setItems(updatedItems);
      calcularTotal(updatedItems);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  const calcularTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => {
      const precioAplicado = item.precioAplicado || 0;
      const cantidad = item.cantidad || 0;
      return sum + precioAplicado * cantidad;
    }, 0);
    setTotal(total);
  };

  const actualizarCantidad = async (id, nuevaCantidad) => {
    try {
      if (nuevaCantidad < 1) return;
      await CartService.actualizarCantidad(id, nuevaCantidad);
      cargarCarrito();
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const eliminarItem = async (id) => {
    try {
      await CartService.eliminarItem(id);
      cargarCarrito();
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await CartService.vaciarCarrito();
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };

  const procesarPago = async () => {
    try {
      const respuesta = await CartService.procesarPago();
      console.log('Pago procesado:', respuesta);
      vaciarCarrito();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.productoImagen || 'https://via.placeholder.com/60' }}
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.productoNombre || 'Producto desconocido'}</Text>
        <Text style={styles.productPrice}>
          ${item.precioAplicado?.toFixed(2) || '0.00'} x {item.cantidad || 0}
        </Text>
        <Button title="-" onPress={() => actualizarCantidad(item.id, (item.cantidad || 1) - 1)} />
        <Button title="Eliminar" onPress={() => eliminarItem(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      <Text>Total: ${total?.toFixed(2) || '0.00'}</Text>
      <Button title="Vaciar Carrito" onPress={vaciarCarrito} />
      <Button title="Procesar Pago" onPress={procesarPago} />
    </View>
  );
};

// Definición de styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
});

export default Carrito;
