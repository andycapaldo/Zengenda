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

const DueDateSelector = () => {
// Placeholder for showing due dates
const dates = [
    { id: '1', name: 'Today' },
    { id: '2', name: 'Tomorrow' },
    { id: '3', name: 'Icon' },
    ];

    // Here we'll need to think about how we want to deal with calendar/date functionality
    // We can have simple code

    return (
    <View style={styles.categoryContainer}>
        {dates.map((date) => (
        <TouchableOpacity key={date.id.toString()} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{date.name}</Text>
        </TouchableOpacity>
        ))}
    </View>
    );
};

export default DueDateSelector