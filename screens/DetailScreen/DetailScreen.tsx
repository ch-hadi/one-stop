import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Button from '@/components/Button/Button';
import Product from '@/components/Product/Product';

const relatedProducts = [
  { id: '1', name: 'Related Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Related Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Related Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
];

const DetailScreen = ({ route }:any) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button title="Add to Cart" onPress={() => {}} style={styles.addToCartButton} />
      </View>
      <Text style={styles.relatedTitle}>Related Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {relatedProducts.map((item) => (
          <View key={item.id} style={styles.relatedProductContainer}>
            <Product
              image={item.image}
              name={item.name}
              price={item.price}
              onAddToCart={() => {}}
              onAddToWishlist={() => {}}
            />
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  addToCartButton: {
    marginTop: 16,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  relatedProductContainer: {
    width: 200,
    marginRight: 16,
  },
});

export default DetailScreen;