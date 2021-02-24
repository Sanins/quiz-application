import auth from '@react-native-firebase/auth';

export const Register = async function (
  email: string,
  password: string,
): Promise<void | string> {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      return 'Email already in use';
    } else if (e.code === 'auth/invalid-email') {
      return 'Email address is not valid';
    } else if (e.code === 'auth/weak-password') {
      return 'The password requires a minimum of 6 chars';
    } else {
      return 'Error';
    }
  }
};
