import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

export const GoogleLogin = async function (): Promise<void | string> {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  if (auth().currentUser !== null) {
    await auth()
      .currentUser.linkWithCredential(googleCredential)
      .catch((e) => {
        console.log(e);
      });
  }

  try {
    auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log(e.email);
    if (e.code === 'auth/account-exists-with-different-credential') {
      return 'Account already exists under a different login provider';
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
  }
};
