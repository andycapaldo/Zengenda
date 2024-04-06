import { StyleSheet, View, ImageBackground, Image, Pressable, Text, TouchableOpacity } from "react-native";
import {
    useFonts,
    Quicksand_400Regular
} from "@expo-google-fonts/quicksand";
  import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";

interface WelcomeBackProps {
    navigation: NavigationProp<any, any>;
}


const WelcomeBack = ({ navigation }: WelcomeBackProps) => {

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

    <>
        <View style={styles.background}>
            <ImageBackground 
                source={require("../components/images2/clouds_background.png")} 
                resizeMode="cover" 
                style={styles.image} 
            >
            <View style={styles.page}>
                <View style={styles.zengenda}>
                    <Image source={require("../components/images2/zengenda.png")} />
                </View>
                <View style={styles.welcomeBackContainer}>
                    <Image 
                        style={styles.welcomeBack} 
                        source={require("../components/images2/welcomeback.png")} 
                    />
                </View>
                <View style={styles.rememberContainerWrapper}>
                    <View style={styles.rememberContainer}>
                        <View style={styles.remember}>
                            <Image source={require("../components/images2/remember.png")} />
                        </View>
                        <View style={styles.inspiration}>
                            <Image source={require("../components/images2/inspiration.png")} />
                        </View>
                        <View style={styles.repeatIcon}>
                            <Image source={require("../components/images2/repeaticon.png")} />
                        </View>
                    </View>
                </View>
                <View style={styles.getStartedContainer}>
                    <TouchableOpacity style={styles.getStartedButton} 
                    onPress={() => navigation.navigate('InsideLayout', { screen: 'Dashboard' })}>
                        <Text style={styles.text}>Get Started</Text>
                    </TouchableOpacity>
                </View>                 
            </View>
            </ImageBackground>
        </View>
    </>
    )
}
export default WelcomeBack

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    page: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
    },
    zengenda: {
        flex: 0.001,
        paddingTop: 70,
    },
    welcomeBack: {
        resizeMode: 'contain',
        height: 305,
        width: 305,
    },
    welcomeBackContainer: {
        flex: 1.5,
    },
    getStartedButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#111111',
    },
    getStartedContainer: {
        flex: .4,
        width: 290,
    },
    text: {
        fontSize: 29,
        fontFamily: "Quicksand_400Regular",
        color: '#FEFEFE'
    },
    rememberContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberContainerWrapper: {
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    remember: {
        flex: 1,
    },
    inspiration: {
        flex: 5,
    },
    repeatIcon: {
        flex: 1,
    },
})
