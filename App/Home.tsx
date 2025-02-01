import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar'; 
import { fetchItems } from '../utils/api';

export default function Home() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: items, isLoading, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

  const filteredItems = searchQuery
    ? items?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items; 

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#736A6A" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Image 
          source={require('../../minecraft-app/assets/dead-skeleton.png')} 
        />
        <Text style={styles.errorText}>Error loading items: {error?.message || 'Unknown error'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Minecraft Items List</Text>

        <View style={styles.contentContainer}>
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
        </View>

        {filteredItems && filteredItems.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredItems}
            keyExtractor={(item, index) => `${item.namespacedId}-${index}`}
            getItemLayout={(data, index) => ({
              length: 80, 
              offset: 80 * index, 
              index,
            })}
            contentContainerStyle={styles.flatListContent} 
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.namespacedId) {
                    navigation.navigate('ItemDetails', { namespacedId: item.namespacedId });
                  } else {
                    console.log("No namespacedId found for item:", item);
                  }
                }}
              >
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Image source={require('../../minecraft-app/assets/crying-villager.png')} />
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9C9C7',
  },
  flatListContent: {
    paddingHorizontal: 15, 
  },
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252326',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    marginBottom: 12,
    backgroundColor: '#EBEAE8',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#252326',
    fontWeight: 'bold',
    flexShrink: 1, 
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#6C6C6C',
    fontStyle: 'italic',
  },
});