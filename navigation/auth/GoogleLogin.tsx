import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

export const GoogleLogin = async function (): Promise<void | string> {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  try {
    auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log(e);
  }
};
