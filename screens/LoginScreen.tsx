import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {ErrorModal} from '../utils/ErrorModal';
import FormInput from '../components/FormInput';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  // const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState('');

  const {login, googleLogin, facebookLogin, error} = useContext(AuthContext);

  const SignIn = (email: string, password: string) => {
    if (password.length <= 6) {
      setPasswordError('password length needs to be more than 6 characters');
      return;
    }

    return login(email, password);
  };

  return (
    <View style={styles.container}>
      {error() && <ErrorModal error={error()} />}
      <Text style={styles.text}>Welcome{'\n'}Back.</Text>

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#FFF"
        backgroundColor="#496AD5"
        onPress={() => facebookLogin()}
      />

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#FFF"
        backgroundColor="#de4d41"
        onPress={() => googleLogin()}
      />

      <Text style={styles.label}>Email</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Password</Text>
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
      />

      <Text>{passwordError}</Text>

      <FormButton
        bgColor="light"
        buttonTitle="Sign In"
        onPress={() => SignIn(email, password)}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('ForgottenPassword')}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 46,
    marginBottom: 10,
    color: '#FFF',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#9E9E9E',
  },
  label: {
    marginTop: 40,
    fontSize: 18,
    padding: 0,
    fontWeight: '500',
    textAlign: 'left',
    color: '#9E9E9E',
  },
  input: {
    backgroundColor: 'red',
    paddingBottom: 20,
    paddingTop: 40,
    flex: 1,
    height: 20,
    fontSize: 28,
    color: '#fff',
    borderBottomColor: '#393939',
    borderBottomWidth: 1,
  },
});
