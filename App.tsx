import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './app/FirebaseConfig';
import AddTask from './app/screens/AddTask';
import CalendarComp from './app/components/CalendarComp';
import { MenuProvider } from 'react-native-popup-menu';
import SettingsScreen from './app/screens/SettingsScreen';
import CreateAccount from './app/components/CreateAccount';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Dashboard" component={Dashboard} />
      <InsideStack.Screen name="Add Task" component={AddTask} />
      <InsideStack.Screen name="Calendar" component={CalendarComp} />
      <InsideStack.Screen name="Settings" component={SettingsScreen} />
      <InsideStack.Screen name="CreateAccount" component={CreateAccount} />
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
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
          {user ? (
            <Stack.Screen name='Login' component={InsideLayout} options={ { headerShown: false }} />
          ) : (
            <Stack.Screen name='Login' component={Login} options={ { headerShown: false }} />
          )}
        
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

