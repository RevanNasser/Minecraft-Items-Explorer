import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchItemDetails } from '../utils/api';
import Header from '../components/Header';

type ItemDetailsRouteProp = RouteProp<{ ItemDetails: { namespacedId: string } }, 'ItemDetails'>;

export default function ItemDetails() {
  const route = useRoute<ItemDetailsRouteProp>();
  const { namespacedId } = route.params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemDetails = await fetchItemDetails(namespacedId);
        setItem(itemDetails);
      } catch (err) {
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [namespacedId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#736A6A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>No item found!</Text>
      </View>
    );
  }

  return (
    <>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        
        <View style={styles.itemBox}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>

        <View style={styles.detailsBox}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>

        <View style={styles.stackBox}>
          <Text style={styles.sectionTitle}>Stack Size</Text>
          <Text style={styles.itemDescription}>{item.stackSize}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  itemBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  itemImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252326',
    marginBottom: 10,
  },
  detailsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  stackBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252326',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: '#6C6C6C',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});