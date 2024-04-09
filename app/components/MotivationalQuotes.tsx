
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";




export default function MotivationalQuotes() {
    const [selectedQuote, setSelectedQuote] = useState('');

    const quotes = ['“Fear is what stops you. Courage is what keeps you going.” — Unknown', '“Have the courage to follow your heart and intuition. They somehow know what you truly want to become.” — Steve Jobs', "“Courage is found in unlikely places.” — J.R.R. Tolkien", "“Change is inevitable but personal growth is a choice.” — Bob Proctor", "“I am not what happened to me, I am what I choose to become.” — Carl Jung",]

    const [fontsLoaded] = useFonts({
        Quicksand_400Regular,
      });

    useEffect(() => {
        selectQuote();
    }, [])

    const selectQuote = () => {
        const random = Math.floor(Math.random() * quotes.length);
        setSelectedQuote(quotes[random]); 
    }

    console.log(selectedQuote)
return (
    <View style={styles.rememberContainerWrapper}>
        <View style={styles.rememberContainer}>
            <View style={styles.remember}>
                <Image
                source={require("../components/images2/remember.png")} />
            </View>
            <View style={styles.inspiration}>
                <Text style={styles.quoteText}>{selectedQuote}</Text>
            </View>
            <TouchableOpacity style={styles.refresh} onPress={selectQuote}>
                <View style={styles.repeatIcon}>
                    <Image 
                        source={require("../components/images2/repeaticon.png")}
                        style={styles.refresh} 
                    />
                </View>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create ({
    text: {
        fontSize: 29,
        fontFamily: "Quicksand_400Regular",
        color: "#FEFEFE",
    },
    rememberContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        width: 390,
    },
    rememberContainerWrapper: {
        flex: 1.8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    remember: {
        flex: 0.1,
        paddingTop: 10,
    },
    inspiration: {
        flex: 0.7,
        color: '#111111',
    },
    repeatIcon: {
        flex: 1,
    },
    quoteText : {
        flex: 1,
        color: '#111111',
        textAlign: 'center',
        paddingTop: 70,
        paddingHorizontal:10,
        fontFamily: "Quicksand_400Regular",
        fontSize: 20,
    },
    refresh: {
        flex: 0.2,
        paddingTop: 40,
        height: 50,
        width: 50,
    },
});