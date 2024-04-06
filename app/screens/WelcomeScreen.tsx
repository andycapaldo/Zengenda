import { StyleSheet, View, ImageBackground, Image, Pressable, Text } from "react-native";
import {
    useFonts,
    Quicksand_400Regular
  } from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";

interface WelcomeProps {
    navigation: NavigationProp<any, any>;
}

const WelcomeScreen = ({ navigation }: WelcomeProps) => {

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
                <View style={styles.helloContainer}>
                    <Image 
                        style={styles.hello} 
                        source={require("../components/images2/hello.png")} 
                    />
                </View>
                <View style={styles.jumpInButtonContainer}>
                    <Pressable style={styles.jumpInButton} 
                    onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.text}>Jump In</Text>
                    </Pressable>
                </View>                 
            </View>
            </ImageBackground>
        </View>
        
    </>
  )
}
export default WelcomeScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
    },
    zengenda: {
        flex: 0.2,
        paddingTop: 70,
    },
    hello: {
        resizeMode: 'contain',
        height: 325,
        width: 325,
    },
    helloContainer: {
        flex: 1.8,
    },
    jumpInButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#111111',
    },
    jumpInButtonContainer: {
        flex: .23,
        paddingBottom: 180,
        width: 290,
    },
    text: {
        fontSize: 29,
        fontFamily: "Quicksand_400Regular",
        color: '#FEFEFE'
    },
})
