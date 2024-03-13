import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native'
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { Picker } from '@react-native-picker/picker';

interface AddCategoryProps {
    isVisible: boolean;
    onClose: () => void;
}



const AddCategory = ({ isVisible, onClose }: AddCategoryProps) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');

    const addCategory = async () => {
        if (!categoryName) {
            alert('Please enter a category name')
            return;
        }
        try {
            const auth = getAuth();
            await addDoc(collection(FIRESTORE_DB, 'categories'), {
                name: categoryName,
                color: categoryColor,
                userId: auth.currentUser!.uid
            });
            onClose();
            setCategoryName('')
            setCategoryColor('#000000')
        } catch (error) {
            console.error('Error adding category: ', error);
        }
    };

  return (
    <Modal
        visible={isVisible}
        onRequestClose={onClose}
        animationType="slide"
        transparent={true}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Add a New Category</Text>
                <TextInput
                style={styles.modalTextInput}
                placeholder='Category Name'
                onChangeText={setCategoryName}
                value={categoryName}/>
                <Picker
                    selectedValue={categoryColor}
                    onValueChange={(itemValue) =>
                    setCategoryColor(itemValue)}>
                        <Picker.Item label="Red" value="#FF0000" />
                        <Picker.Item label='Blue' value="#0000FF" />
                        <Picker.Item label='Green' value='#00FF00' />
                </Picker>
                <TouchableOpacity style={styles.button} onPress={addCategory}>
                    <Text style={styles.buttonText}>Add Category</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTextInput: {
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#111111',
        fontSize: 13,
        textAlign: 'center',
    },
})
export default AddCategory