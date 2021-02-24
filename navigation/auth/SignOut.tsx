import auth from '@react-native-firebase/auth';

export const SignOut = async function (): Promise<void> {
  return await auth().signOut();
};
