import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../screens/AddTask';

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