import {GoogleSignin} from '@react-native-community/google-signin';
import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';

export const Providers = () => {
  useEffect(() => {
    // initialize the Google SDK
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
      iosClientId: Config.IOS_CLIENT_ID,
    });
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
