import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Button from '@/components/Button/Button';
import { Ionicons } from '@expo/vector-icons'; // For back button and icons

const initialCartItems = [
  { id: '1', name: 'Product 1', price: 19.99, quantity: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s' },
  { id: '2', name: 'Product 2', price: 29.99, quantity: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s' },
  { id: '3', name: 'Product 3', price: 39.99, quantity: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s' },
];

const CartScreen = ({ navigation }:any) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQuantity = (id:any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id:any) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.detailsContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Ionicons name="remove-circle-outline" size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
          }
        />
        <Button title="Checkout" onPress={() => {}} style={styles.checkoutButton} />
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#007AFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemQuantity: {
    fontSize: 16,
    paddingHorizontal: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});

export default CartScreen;
