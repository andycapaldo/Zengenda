import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
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
    <>
      <View style={styles.invertedBar}>
        <StatusBar backgroundColor="#FEFEFE" barStyle="default" />
        <SafeAreaView style={styles.safeArea}></SafeAreaView>
      </View>
      <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <View style={styles.backButtonView}>
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Image
                style={styles.backButton}
                source={require("../components/images2/backButton.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.headerText}>Calendar</Text>
          </View>
        </View>
        <Calendar
          onDayPress={handleDayPress}
          style={styles.calendar}
          theme={{
            backgroundColor: "#FEFEFE",
            calendarBackground: "#FEFEFE",
            textSectionTitleColor: "#111111",
            dayTextColor: "#111111",
            monthTextColor: "#111111",
            indicatorColor: "black",
            textDayFontFamily: "Quicksand_400Regular",
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#FEFEFE",
  },
  invertedBar: {
    flex: 0.041,
    backgroundColor: "FEFEFE",
  },
  calendar: {
    height: 650,
    width: 400,
    paddingTop: 40,
  },
  backButton: {
    height: 40,
    width: 40,
  },
  backButtonView: {
    flex: 1,
    height: 50,
    width: 50,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 3,
    fontSize: 50,
    fontWeight: "bold",
    color: "#111111",
    fontFamily: "Quicksand_400Regular",
    paddingRight: 80,
    paddingTop: 45,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
});
export default CalendarComp;
