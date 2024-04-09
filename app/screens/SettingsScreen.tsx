import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { NavigationProp } from '@react-navigation/native';

interface SettingsProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({ navigation }: SettingsProps) => {

  const [themeState, setThemeState] = useState(0);
  const [remindersState, setRemindersState] = useState(0);
  const [soundsState, setSoundsState] = useState(0);
  const [quoteState, setQuoteState] = useState(0);
  const [affirmationsState, setAffirmationsState] = useState(0);
  const [breateState, setBreatheState] = useState(0);
  const [pauseAccountState, setPauseAccountState] = useState(1);
      
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }), [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.headerContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dashboard')}>
                    <Image style={styles.backButton} source={require('../components/images2/backButton.png')} />
                  </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerText}>Settings</Text>
              </View>
            </View>
      <View style={styles.sectionHeader}>
        <Image
          style={styles.icon}
          source={require("../components/images2/profile.png")}
        />
        <Text style={styles.sectionTitle}>Profile</Text>
      </View>
      <View style={styles.itemSection}>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Change Profile Picture</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Edit Name</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Theme Section */}
      <View style={styles.sectionHeader}>
        <Image
          style={styles.icon}
          source={require("../components/images2/theme_yellow.png")}
        />
        <Text style={styles.sectionTitle}>Theme</Text>
      </View>
      <View style={styles.itemSection}>
        <SegmentedControlTab
          values={["Light Mode", "Dark Mode", "Automatic"]}
          selectedIndex={themeState}
          onTabPress={setThemeState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
        />
      </View>

      {/* Notifications Section */}

      <View style={styles.sectionHeader}>
        <Image
          style={styles.icon}
          source={require("../components/images2/notifications_red.png")}
        />
        <Text style={styles.sectionTitle}>Notifications</Text>
      </View>
      <View style={styles.itemSection}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Task Reminders</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={remindersState}
          onTabPress={setRemindersState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Set Reminder Time</Text>
          <Text style={styles.itemText}>8:00 AM</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>App Sounds</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={soundsState}
          onTabPress={setSoundsState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Image
          style={styles.icon}
          source={require("../components/images2/motivation_green.png")}
        />
        <Text style={styles.sectionTitle}>Motivation</Text>
      </View>
      <View style={styles.itemSection}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Daily Motivational Quote</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={quoteState}
          onTabPress={setQuoteState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Positive Affirmations</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={affirmationsState}
          onTabPress={setAffirmationsState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Breathe Reminders</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={breateState}
          onTabPress={setBreatheState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Reward System</Text>
          <SegmentedControlTab
          values={["Coming Soon"]}
          selectedIndex={2}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
          enabled={false}
        />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Image
          style={styles.icon}
          source={require("../components/images2/settings_blue.png")}
        />
        <Text style={styles.sectionTitle}>Account</Text>
      </View>
      <View style={styles.itemSection}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Pause Account</Text>
          <SegmentedControlTab
          values={["On", "Off"]}
          selectedIndex={pauseAccountState}
          onTabPress={setPauseAccountState}
          tabStyle={{ backgroundColor: "#111111", borderColor: "#111111" }}
          tabTextStyle={{
            color: "#FEFEFE",
            fontFamily: "Quicksand_400Regular",
          }}
          activeTabStyle={{ backgroundColor: "#FEFEFE" }}
          activeTabTextStyle={{ color: "#111111" }}
          tabsContainerStyle={{ height: 30, width: 100, }}
        />
        </View>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Connected Accounts</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionItemContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer with Version and Credits */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ZENGENDA</Text>
        <Text style={styles.footerText}>Version COLAB27</Text>
        <Text style={styles.footerText}>
          Manshi | Jesse | Andrew | Jordan © 2024
        </Text>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
            onPress={() => {
                FIREBASE_AUTH.signOut().then(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'WelcomeScreen' }],
                    });
                }).catch((error) => {
                    console.error('Sign out error', error);
                });
            }}
            style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Quicksand_400Regular',
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
      flex: 1,
      height: 40,
      width: 40,
    },
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 60,
      paddingBottom: 10,
      paddingLeft: 10,
      alignItems: "center",
      fontSize: 25,
      fontFamily: "Quicksand_400Regular",
    },
    headerText: {
      flex: 1,
      fontSize: 40,
      fontWeight: "bold",
      color: "#111111",
      fontFamily: "Quicksand_400Regular",
      paddingLeft: 55,
    },
    sectionItemContainer: {
        marginTop: 10,
    },
    itemSection: {
        paddingLeft: 20,
        marginTop: 20,
    },
    sectionHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 25,
        fontFamily: 'Quicksand_400Regular',
        marginLeft: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      // ...your styles
    },
    itemText: {
        fontFamily: 'Quicksand_400Regular',
    },
    logoutContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 100,
    },
    logoutButton: {
        backgroundColor: '#983F3F',
        maxWidth: 300,
        height: 50,
        borderRadius: 10,
        borderColor: '#111111',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 30,
        color: '#FEFEFE'
    },
    footer: {
        alignItems: 'center',
        padding: 20,
        marginVertical: 10,
    },
    footerText: {
    
    },
    icon: {
        height: 35,
        width: 35,
    },
    deleteAccountText: {
        fontFamily: 'Quicksand_400Regular',
        color: 'red',
    },
});

export default Settings;
