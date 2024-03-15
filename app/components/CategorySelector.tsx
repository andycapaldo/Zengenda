import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB, getAuth } from '../../FirebaseConfig';

interface Category {
  name: string;
  color: string;
}



const CategorySelector = () => {
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
        {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
        ))}
    </View>
    );
};

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