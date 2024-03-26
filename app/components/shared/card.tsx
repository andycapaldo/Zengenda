import React from "react";
import { StyleSheet, View } from "react-native";
import {
    useFonts,
    Quicksand_400Regular
  } from "@expo-google-fonts/quicksand";
import * as SplashScreen from 'expo-splash-screen';


export default function Card(props) {

    const [fontsLoaded] = useFonts({
        Quicksand_400Regular
      });

      if (!fontsLoaded) {
        return undefined;
      } else {
        SplashScreen.hideAsync();
      }

    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {

    },

})