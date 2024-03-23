import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'


const CalendarComp = () => {
  return (
    <View style={styles.centeredView}>
      <Calendar 
      onDayPress={day => {console.log('selected day', day);}} 
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