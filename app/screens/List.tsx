import { View, Button, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigation.navigate("details")}
          title="Open Details"
        />
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      </View>
    </View>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {},
  buttons: {},
});
