import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}


const CalendarComp = ({ navigation }: RouterProps) => {

  const handleDayPress = (day) => {
    navigation.navigate({
      name: 'Add Task',
      params: { selectedDate: day['dateString'] },
      merge: true,
    });
  };

  return (
    <View style={styles.centeredView}>
      <Calendar 
      onDayPress={handleDayPress} 
      style={{height: 650, width: 400}}  
      theme={{ 
        backgroundColor: '#111111', 
        calendarBackground: '#111111', 
        textSectionTitleColor: '#FEFEFE',
        dayTextColor: '#FEFEFE',
        monthTextColor: '#FEFEFE',
        indicatorColor: 'black',
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#111111'
  },
})
export default CalendarComp