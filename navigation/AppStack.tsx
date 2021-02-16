import React, {useEffect} from 'react';
import {WEB_CLIENT_ID} from 'react-native-dotenv';
import {GoogleSignin} from '@react-native-community/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
