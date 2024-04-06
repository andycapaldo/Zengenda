import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import AddTask from './app/screens/AddTask';
import CalendarComp from './app/components/CalendarComp';
import { MenuProvider } from 'react-native-popup-menu';
import SettingsScreen from './app/screens/SettingsScreen';
import CreateAccount from './app/components/CreateAccount';
import WelcomeScreen from './app/screens/WelcomeScreen';
import WelcomeBack from './app/screens/WelcomeBack';
import LoadingScreen from './app/components/LoadingScreen';

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
      <InsideStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <InsideStack.Screen name="WelcomeBack" component={WelcomeBack} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }} 
        >
          {user ? (
            <Stack.Screen name='InsideLayout' component={InsideLayout} />
          ) : (
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          )}
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
