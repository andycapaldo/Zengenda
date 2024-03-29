import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Quicksand_400Regular
} from "@expo-google-fonts/quicksand";

interface AddCategoryProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCategory = ({ isVisible, onClose }: AddCategoryProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#01A0B0");

  const addCategory = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }
    try {
      const auth = getAuth();
      const docRef = doc(collection(FIRESTORE_DB, "categories"));
      const categoryId = docRef.id;

      await setDoc(docRef, {
        id: categoryId,
        name: categoryName,
        color: categoryColor,
        userId: auth.currentUser!.uid,
      });
      onClose();
      setCategoryName("");
      setCategoryColor("#000000");
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const options = [
    { label: "orange", value: "#F58021" },
    { label: "pink", value: "#D36C91" },
    { label: "blue", value: "#01A0B0" },
    { label: "olive", value: "#9EB861" },
    { label: "purple", value: "#593F98" },
    { label: "red", value: "#983F3F" },
    { label: "navy", value: "#3F6398" },
    { label: "violet", value: "#983F8F" },
    { label: "green", value: "#3F9858" },
    { label: "yellow", value: "#FDB814" },
  ];

  const renderColorOptions = () =>
    options.map((option) => (
        <TouchableOpacity
          key={option.label}
          style={[styles.colorSwatch, { backgroundColor: option.value }]}
          onPress={() => setCategoryColor(option.value)}
        />
    ));

    const [fontsLoaded] = useFonts({
      Quicksand_400Regular
    });
  
    useEffect(() => {
      async function prepare() {
        await SplashScreen.preventAutoHideAsync();
      }
      prepare();
    }, [])
  
    if (!fontsLoaded) {
      return undefined;
    } else {
      SplashScreen.hideAsync();
    }

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a New Category</Text>
          <View style={styles.textInputBorder}>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Category Name"
              onChangeText={setCategoryName}
              value={categoryName}
            />
          </View>
          <View style={styles.colorOptionsContainer}>
            {renderColorOptions()}
          </View>
          <View
            style={[styles.categoryExample, { backgroundColor: categoryColor }]}
          >
            <Text style={styles.categoryExampleText}>
              {categoryName || "Example"}
            </Text>
          </View>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={addCategory}>
              <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    overflow: 'hidden',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputBorder: {
    borderColor: '#111111',
    borderWidth: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontFamily: 'Quicksand_400Regular',
  },
  modalTextInput: {
    marginBottom: 15,
    fontSize: 15,
    fontFamily: 'Quicksand_400Regular',
  },
  button: {
    backgroundColor: "#E7E7E7",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#111111",
    fontSize: 15,
    textAlign: "center",
    fontFamily: 'Quicksand_400Regular',
  },
  colorOptionsContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center",
    marginVertical: 15,
    overflow: 'hidden',    
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  categoryExample: {
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
    display: 'flex',
  },
  categoryExampleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: 'Quicksand_400Regular',
  },
  addButtonContainer: {
    marginTop: 10,
  },
  cancelButtonContainer: {
    marginTop: 10,
  },
});
export default AddCategory;
