import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textParagraph}>Welcome to APP NAME</Text>
      <Text style={styles.heading1}>Get Started.</Text>
      <FormButton
        bgColor="light"
        buttonTitle="Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
      <FormButton
        bgColor="dark"
        buttonTitle="Sign in"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textParagraph: {
    fontSize: 16,
    marginBottom: 10,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  heading1: {
    fontSize: 36,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});
