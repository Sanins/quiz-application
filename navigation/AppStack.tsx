import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateQuizScreen from '../screens/CreateQuizScreen';
import UsernameScreen from '../screens/UsernameScreen';
import {AuthContext} from './AuthProvider';

const Stack = createStackNavigator();

export const AppStack = () => {
  const [firestoreUserData, setfirestoreUserData] = useState<any>({
    id: '',
    username: '',
  });

  const ref = firestore().collection('users');
  const {user} = useContext(AuthContext);

  useEffect(() => {
    return ref.where('id', '==', user.uid).onSnapshot((querySnapshot) => {
      let list = firestoreUserData;
      querySnapshot.forEach((doc) => {
        const {username} = doc.data();
        list = {
          username,
        };
      });
      setfirestoreUserData(list);
    });
  }, []);

  console.log(firestoreUserData.username);

  return (
    <Stack.Navigator>
      {!firestoreUserData.username ? (
        <Stack.Screen name="Username" component={UsernameScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
