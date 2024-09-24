import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; import Product from '@/components/Product/Product';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden'];
const trendingProducts = [
    { id: '1', name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150' }];

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search products..." />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroller}>
                    {categories.map((category, index) => (<Text key={index} style={styles.category}>
                        {category}</Text>))}
                </ScrollView>
                <View>
                    <Text style={styles.sectionTitle}>Trending Products</Text>
                </View>
                <FlatList data={trendingProducts}
                    renderItem={({ item }) => (<Product image={item.image} name={item.name} price={item.price} onAddToCart={() => { }}
                        onAddToWishlist={() => { }} />)}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productRow} />
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'rgb(242, 242, 242)', },
    container: { flex: 1, padding: 16, },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
    },
    categoryScroller: {
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 16,
        color: '#007AFF',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    productRow: {
        justifyContent: 'space-between',
    },
});

export default HomeScreen;