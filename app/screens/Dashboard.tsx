import { View, Text, Button, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Dashboard = ({ navigation }: RouterProps) => {

  useEffect(() => {
  }, [])

  const addTodo = async () => {
    console.log('ADD');

    const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), {title: 'I am a test', done: false});
    console.log('Document added: ', doc);
  };
  return (
    <>
      <View>
        <Text>Today is your day, User!</Text>
      </View>
      <View>
        <Text>This is where the Dashboard will sit.</Text>
      </View>
      <View style={styles.horizontalFlex}>
        <Button title='Inbox' />
        <Button title='Flagged' />
        <Button title='Someday' />
      </View>
      <View>
        <Text>Today</Text>
        <View style={styles.categoryList}>
          <Text>List of Catgories viewed horizontally</Text>
        </View>
      </View>
      <View>
        <Text>List of today's tasks vertically</Text>
      </View>
      <View>
        <Text>That's all for today.  You got this!</Text>
      </View>
      <View style={styles.container}>
          <Button onPress={() => addTodo()} title="Add Todo" />
          <Button onPress={() => navigation.navigate('details')} title="Open Details" />
          <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
      </View>
    </>
  )
}
export default Dashboard
const styles = StyleSheet.create({
  horizontalFlex: {
    flexDirection: 'row'
  },
  categoryList: {
    
  },
  container: {

  },
})