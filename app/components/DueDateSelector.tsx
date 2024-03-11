import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../screens/AddTask';

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