import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Login} from './auth/Login';
import {Register} from './auth/Register';
import {GoogleLogin} from './auth/GoogleLogin';
import {FacebookLogin} from './auth/FacebookLogin';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          const tryLogin = await Login(email, password);

          if (tryLogin) {
            setError(tryLogin);
          }
        },
        register: async (email, password) => {
          const tryRegister = await Register(email, password);

          if (tryRegister) {
            setError(tryRegister);
          }
        },
        logout: async () => {
          await auth().signOut();
        },
        error: () => {
          if (error) {
            return error;
          }
        },
        googleLogin: async () => {
          await GoogleLogin();
        },
        facebookLogin: async () => {
          const tryFacebook = await FacebookLogin();

          if (tryFacebook) {
            setError(tryFacebook);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
