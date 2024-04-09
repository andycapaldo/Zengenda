import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface LoginProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("InsideLayout");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Check your emails!");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../components/images2/clouds_background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentWrapper}>
        <View style={styles.zengendalogo}>
          <Image source={require("../components/images2/zengendawhitelogo.png")} />
        </View>
        <View style={styles.body}>
          <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <View style={styles.buttonView}>
                  <Button title="Login" onPress={signIn} />
                  <Button title="Create account" onPress={signUp} />
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        </View>

        </View>
      </ImageBackground>
    </View>
  );
};
export default Login;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  zengendalogo: {
    flex: 0.4,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 50,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: 360,
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: "#FEFEFE",
  },
  body: {
    flex: 0.5,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
  },
});
