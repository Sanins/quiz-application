import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const ConnectUserInformation = () => {
  const ref = firestore().collection('users');
  const {user} = useContext(AuthContext);

  const providerId = JSON.stringify(user.providerData[0].providerId);

  if (providerId === '"google.com"') {
    ref.doc(user.uid).set({id: user.uid, google: true}, {merge: true});
  } else if (providerId === '"facebook.com"') {
    ref.doc(user.uid).set({id: user.uid, facebook: true}, {merge: true});
  } else if (providerId === '"password"') {
    ref.doc(user.uid).set({id: user.uid, appLogin: true}, {merge: true});
  } else {
    return;
  }
};

const HomeScreen = ({navigation}) => {
  ConnectUserInformation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the dashboard</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Create a quiz"
        onPress={() => navigation.navigate('CreateQuiz')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
