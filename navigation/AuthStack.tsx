import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#000',
            shadowColor: '#000',
            elevation: 0,
          },
          headerLeft: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#000"
                color="#FFF"
                onPress={() => navigation.navigate('Splash')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="ForgottenPassword"
        component={ForgotPasswordScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#000',
            shadowColor: '#000',
            elevation: 0,
          },
          headerLeft: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#000"
                color="#FFF"
                onPress={() => navigation.navigate('Splash')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
