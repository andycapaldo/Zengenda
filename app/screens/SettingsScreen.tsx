import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    useFonts,
    Quicksand_400Regular
} from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';
import SegmentedControlTab from 'react-native-segmented-control-tab';




const Settings = () => {

    const [modeState, setModeState] = useState(0);

    const [fontsLoaded] = useFonts({
        Quicksand_400Regular
    });

    useEffect(() => {
        async function prepare() {
        await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    });

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    };

return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
        <View style={styles.sectionHeader}>
            <Image style={styles.icon} source={require("../components/images2/profile.png")} />
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
                <Image style={styles.icon} source={require("../components/images2/theme_yellow.png")} />
                <Text style={styles.sectionTitle}>Theme</Text>
        </View>
        <View style={styles.itemSection}>
                <SegmentedControlTab
                values={["Light Mode", "Dark Mode", "Automatic"]} 
                selectedIndex={modeState}
                onTabPress={setModeState}
                tabStyle={{backgroundColor: '#111111', borderColor: '#111111', }}
                tabTextStyle={{ color: '#FEFEFE', fontFamily: 'Quicksand_400Regular'}}
                activeTabStyle={{ backgroundColor: '#FEFEFE' }}
                activeTabTextStyle={{ color: '#111111' }}/>
        </View>

      {/* Notifications Section */}
        
        <View style={styles.sectionHeader}>
            <Image style={styles.icon} source={require("../components/images2/notifications_red.png")} />
            <Text style={styles.sectionTitle}>Notifications</Text>
        </View>
        <View style={styles.itemSection}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Task Reminders</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Set Reminder Time</Text>
                <Text style={styles.itemText}>8:00 AM</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>App Sounds</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
        </View>

        <View style={styles.sectionHeader}>
            <Image style={styles.icon} source={require("../components/images2/motivation_green.png")} />
            <Text style={styles.sectionTitle}>Motivation</Text>
        </View>
        <View style={styles.itemSection}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Daily Motivational Quote</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Positive Affirmations</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Breathe Reminders</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemText}>Reward System</Text>
                <Switch value={true} onValueChange={() => {}} />
            </View>
        </View>

        <View style={styles.sectionHeader}>
            <Image style={styles.icon} source={require("../components/images2/settings_blue.png")} />
            <Text style={styles.sectionTitle}>Account</Text>
        </View>
        <View style={styles.itemSection}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Pause Account</Text>
                <Switch value={true} onValueChange={() => {}} />
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
            <Text style={styles.footerText}>Manshi | Jesse | Andrew | Jordan © 2024</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
    </ScrollView>
    )
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
    logoutButton: {
      // ...your styles
    },
    logoutText: {
      // ...your styles
    },
    footer: {
        alignItems: 'center',
        padding: 20,
    },
    footerText: {
      // ...your styles
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

export default Settings