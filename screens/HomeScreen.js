import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import ProductoService from '../services/ProductoService'; // Asegúrate de importar correctamente el servicio

const HomeScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    // Cargar productos al inicio
    ProductoService.obtenerProductos().then((data) => {
      setProductos(data);
      setProductosFiltrados(data);
    });
  }, []);

  const buscarProductos = () => {
    const filtro = terminoBusqueda.toLowerCase();
    const productosFiltrados = productos.filter(
      (producto) =>
        producto.producto.toLowerCase().includes(filtro) ||
        producto.categoria.toLowerCase().includes(filtro) ||
        producto.marca.toLowerCase().includes(filtro) ||
        producto.descripcion.toLowerCase().includes(filtro)
    );
    setProductosFiltrados(productosFiltrados);
  };

  // Renderiza cada card de producto
  const renderProducto = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.name}>{item.producto}</Text>
      <Text style={styles.price}>{item.precioMen}</Text>
      <Text style={styles.marca}>Marca: {item.marca}</Text>
      <Text style={styles.categoria}>Categoría: {item.categoria}</Text>
      <Button
        title="Detalles"
        onPress={() => navigation.navigate('ProductoDetalle', { id: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar productos..."
        value={terminoBusqueda}
        onChangeText={(text) => setTerminoBusqueda(text)}
        onSubmitEditing={buscarProductos}
      />
      <Button title="Buscar" onPress={buscarProductos} />

      <FlatList
        data={productosFiltrados} // Mostrar todos los productos filtrados
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        numColumns={2} // Mostrar dos columnas
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  marca: {
    fontSize: 12,
    color: '#555',
  },
  categoria: {
    fontSize: 12,
    color: '#555',
  },
});

export default HomeScreen;
