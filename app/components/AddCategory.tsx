import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { FIRESTORE_DB } from '../../FirebaseConfig';



interface AddCategoryProps {
    isVisible: boolean;
    onClose: () => void;
}



const AddCategory = ({ isVisible, onClose }: AddCategoryProps) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#01A0B0');

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
                userId: auth.currentUser!.uid,
            });
            onClose();
            setCategoryName('')
            setCategoryColor('#000000')
        } catch (error) {
            console.error('Error adding category: ', error);
        }
    };

    const options = [
        { label: "blue", value: '#01A0B0'},
        { label: 'orange', value: '#F58021'},
        { label: 'yellow', value: '#FDB814'},
        { label: 'purple', value: '#593F98'},
        { label: 'red', value: '#983F3F'},
    ];

    const renderColorOptions = () => options.map((option) => (
        <TouchableOpacity
        key={option.label}
        style={[styles.colorSwatch, { backgroundColor: option.value }]}
        onPress={ () => setCategoryColor(option.value)} />
    ))

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
                <View style={styles.colorOptionsContainer}>
                    {renderColorOptions()}
                </View>
                <View style={[styles.categoryExample, { backgroundColor: categoryColor }]}>
                    <Text style={styles.categoryExampleText}>{categoryName || 'Example'}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={addCategory}>
                    <Text style={styles.buttonText}>Add Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancel</Text>
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
    colorOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },
    colorSwatch: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
    },
    categoryExample: {
        alignSelf: 'stretch',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryExampleText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
})
export default AddCategory