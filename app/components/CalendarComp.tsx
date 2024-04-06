import { View, Text, StyleSheet, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CalendarComp = ({ navigation }: RouterProps) => {
  const handleDayPress = (day) => {
    navigation.navigate({
      name: "Add Task",
      params: { selectedDate: day["dateString"] },
      merge: true,
    });
  };

  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
  });

  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <View style={styles.backButtonView}>
            <Image 
              style={styles.backButton} 
              source={require('../components/images2/backarrow.png')} 
            />
          </View>
          <View>
            <Text style={styles.headerText}>Calendar</Text>
          </View>
        </View>
      <Calendar
        onDayPress={handleDayPress}
        style={{ height: 650, width: 400 }}
        theme={{
          backgroundColor: "#111111",
          calendarBackground: "#111111",
          textSectionTitleColor: "#FEFEFE",
          dayTextColor: "#FEFEFE",
          monthTextColor: "#FEFEFE",
          indicatorColor: "black",
          textDayFontFamily: 'Quicksand_400Regular',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    backgroundColor: "#111111",
  },
  backButton: {
    height: 50,
    width: 50,
  },
  backButtonView: {
    flex: 1,
    height: 50,
    width: 50,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 90,
    paddingBottom: 10,
    paddingLeft: 2,
    alignItems: "center",
    justifyContent: 'center',
  },
  headerText: {
    flex: 3,
    fontSize: 40,
    fontWeight: "bold",
    color: "#FEFEFE",
    fontFamily: "Quicksand_400Regular",
    paddingRight: 105,
    paddingTop: 25,
  },
});
export default CalendarComp;
