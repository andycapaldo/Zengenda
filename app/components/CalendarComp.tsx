import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'


const CalendarComp = () => {
  return (
    <View>
      <Calendar onDayPress={day => {console.log('selected day', day);}} />
    </View>
  )
}
export default CalendarComp