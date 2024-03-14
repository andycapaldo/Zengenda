import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Details from './app/screens/Details';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import AddTask from './app/screens/AddTask';
import AddChoice from './app/screens/AddChoice';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Dashboard" component={Dashboard} />
      <InsideStack.Screen name="details" component={Details} />
      <InsideStack.Screen name="Add Task" component={AddTask} />
      <InsideStack.Screen name="Add Choice" component={AddChoice} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        {user ? (
          <Stack.Screen name='Login' component={InsideLayout} options={ { headerShown: false }} />
        ) : (
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false }} />
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

