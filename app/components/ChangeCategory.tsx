import { View, Text } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';



export default function ChangeCategory({ category }) {

    const deleteCategory = async () => {
        const taskQuery = query(
            collection(FIRESTORE_DB, 'tasks'),
            where("category", "==", doc(FIRESTORE_DB, "categories", category.id))
        );

        try {
            const taskQuerySnapshot = await getDocs(taskQuery);

            const batch = writeBatch(FIRESTORE_DB);

            taskQuerySnapshot.forEach((doc) => {
                batch.delete(doc.ref)
            });

            await batch.commit();

            await deleteDoc(doc(FIRESTORE_DB, "categories", category.id));
            console.log(`Category and assoicated tasks deleted for ${category.name}`);
        } catch (error) {
        console.error('Error deleting category and associated tasks: ', error);
        } 
    };


return (
    <View>
        <Menu>
            <MenuTrigger>
                <Entypo name='dots-three-horizontal' size={20} color='#111111'></Entypo>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => console.log(`Edit button pressed for ${category.name}`)} text='Edit' />
                <MenuOption onSelect={() => deleteCategory()} text='Delete' />
            </MenuOptions>
        </Menu>
    </View>
    )
}
