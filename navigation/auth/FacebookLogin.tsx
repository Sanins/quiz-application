import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk';

const getFacebookProfile = async function (): Promise<any> {
  return new Promise((resolve) => {
    const infoRequest = new GraphRequest(
      '/me?fields=email,name',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
          resolve(null);
          return;
        }

        resolve(result);
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  });
};

export const FacebookLogin = async function (): Promise<any> {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const profile = await getFacebookProfile();

  const accountExists = await auth().fetchSignInMethodsForEmail(profile.email);

  if (auth().currentUser !== null) {
    await auth()
      .currentUser.linkWithCredential(facebookCredential)
      .catch((e) => {
        console.log(e);
      });
  }
  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(facebookCredential)
    .catch((e) => {
      if (e.code === 'auth/account-exists-with-different-credential') {
        return `Account already exists under: ${accountExists}`;
      } else if (e.code === 'auth/invalid-credential') {
        return 'Please try again';
      } else if (e.code === 'auth/operation-not-allowed') {
        return 'Error';
      } else if (e.code === 'auth/user-disabled') {
        return 'This user account is disabled';
      } else if (e.code === 'auth/user-not-found') {
        return 'No user found with this email';
      } else if (e.code === 'auth/wrong-password') {
        return 'Password is incorrect';
      } else if (e.code === 'auth/invalid-verification-code') {
        return 'Error';
      } else if (e.code === 'auth/invalid-verification-id') {
        return 'Error';
      } else {
        return 'Error';
      }
    });
};
