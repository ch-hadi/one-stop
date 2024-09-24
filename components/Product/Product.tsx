import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductProps {
  image: string;
  name: string;
  price: number;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const Product: React.FC<ProductProps> = ({ image, name, price, onAddToCart, onAddToWishlist }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onAddToWishlist}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
  },
});

export default Product;