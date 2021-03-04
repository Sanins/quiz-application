import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FormButton from '../components/FormButton';
import {FacebookLogin} from '../navigation/auth/FacebookLogin';
import {AuthContext} from '../navigation/AuthProvider';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {user.displayName && <Text style={styles.text}>{user.displayName}</Text>}
      <Text style={styles.text}>This is the Profile Screen</Text>
      <Button
        title="Connect facebook account"
        onPress={() => FacebookLogin()}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
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
