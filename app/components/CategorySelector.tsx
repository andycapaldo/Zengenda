import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create ({ 
  categoryContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  padding: 10,
},
categoryButton: {
  borderWidth: 1,
  borderColor: '#E8E8E8',
  borderRadius: 20,
  paddingVertical: 5,
  paddingHorizontal: 15,
  marginRight: 10,
  marginBottom: 10,
  backgroundColor: '#F0F0F0',
},
categoryText: {
  fontSize: 16
}
});

const CategorySelector = () => {
    // Placeholder state for categories
    const categories = [
    { id: '1', name: 'School' },
    { id: '2', name: 'Finances' },
    { id: '3', name: 'Home' },
      // ... more placeholder categories
    ];

    // Placeholder useEffect and function to fetch categories from the database and update state
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   try {
  //     let response = await fetch('/path-to-your-api');
  //     let json = await response.json();
  //     setCategories(json.categories);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

    return (
    <View style={styles.categoryContainer}>
        {categories.map((category) => (
        <TouchableOpacity key={category.id.toString()} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
        ))}
    </View>
    );
};

export default CategorySelector;