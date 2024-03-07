import { View, Text, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { styles } from './Login';
import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {

  useEffect(() => {
  }, [])

  const addTodo = async () => {
    console.log('ADD');

    const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: 'I am a test', done: false});
    console.log('Document added: ', doc);
  };
  return (
    <View style={styles.container}>
        <Button onPress={() => addTodo()} title="Add Todo" />
        <Button onPress={() => navigation.navigate('details')} title="Open Details" />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  )
}
export default List