import { View, Text, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { styles } from './Login';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  return (
    <View style={styles.container}>
        <Button onPress={() => navigation.navigate('details')} title="Open Details" />
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </View>
  )
}
export default List