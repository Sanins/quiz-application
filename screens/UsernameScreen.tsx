import {firebase} from '@react-native-firebase/firestore';
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';

const UsernameScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const {user} = useContext(AuthContext);

  const UsernameCheck = ({navigation}) => {
    if (username.length > 0) {
      firebase
        .firestore()
        .collection('usernames')
        .doc(username.trim())
        .get()
        .then((data) => {
          if (data.exists) {
            return setError('username not available');
          } else {
            firebase
              .firestore()
              .collection('usernames')
              .doc(username.trim())
              .set({exists: true});
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set({username: username}, {merge: true});
            return navigation.navigate('Home');
          }
        });
    } else {
      return setError('no username entered');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username</Text>

      <FormInput
        labelValue={username}
        onChangeText={(userName) => setUsername(userName)}
        placeholderText="Username"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text>{error}</Text>

      <FormButton
        bgColor="light"
        buttonTitle="Confirm"
        onPress={() => UsernameCheck({navigation})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
});

export default UsernameScreen;
