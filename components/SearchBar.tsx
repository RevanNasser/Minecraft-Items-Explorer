import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        value={query}
        onChangeText={(text) => {
          setQuery(text); 
          onSearch(text); 
        }}
        onClear={() => {
          setQuery(''); 
          onSearch(''); 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: '100%',
    height: 50, 
    alignSelf: 'center',
  },
  input: {
    fontSize: 16,
    color: '#252326',
    flex: 1, 
  },
});

export default SearchBar;