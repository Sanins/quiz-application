import auth from '@react-native-firebase/auth';

export const Login = async function (
  email: string,
  password: string,
): Promise<void | string> {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    if (e.code === 'auth/invalid-email') {
      return 'Invalid email';
    } else if (e.code === 'auth/wrong-password') {
      return 'Invalid password';
    } else if (e.code === 'auth/user-disabled') {
      return 'User has been disabled';
    } else if (e.code === 'auth/user-not-found') {
      return 'No user found with this email';
    } else {
      return 'Error';
    }
  }
};
