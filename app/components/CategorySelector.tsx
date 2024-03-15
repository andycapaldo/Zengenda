import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB, getAuth } from '../../FirebaseConfig';

export interface Category {
  name: string;
  color: string;
  id: string;
}

interface CategorySelectorProps {
  onCategorySelect: (category: Category) => void;
}



function CategorySelector({ onCategorySelect }:CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(FIRESTORE_DB, 'categories'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoryData: Category[] = querySnapshot.docs.map(doc => doc.data() as Category);
      setCategories(categoryData);
    });

    return () => unsubscribe();
  }, []);


  return (
    <View style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={[styles.categoryButton, { backgroundColor: category.color }]} onPress={() => onCategorySelect(category)}>
          <Text style={[styles.categoryText, { color: '#FFF' }]}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default CategorySelector;

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