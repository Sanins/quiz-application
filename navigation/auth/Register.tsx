import auth from '@react-native-firebase/auth';

export const Register = async function (
  email: string,
  password: string,
): Promise<void | string> {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth()
          .currentUser.sendEmailVerification()
          .catch((e) => {
            console.log(e);
          });
      });
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      let provider = await auth().fetchSignInMethodsForEmail(email);
      const google = provider.includes('google.com');
      let socialProvider;
      if (google) {
        socialProvider = 'google';
      } else {
        socialProvider = 'facebook';
      }
      return `Email already in use with ${socialProvider}. Try sign in with ${socialProvider} instead`;
    } else if (e.code === 'auth/invalid-email') {
      return 'Email address is not valid';
    } else if (e.code === 'auth/weak-password') {
      return 'The password requires a minimum of 6 chars';
    } else {
      return 'Error';
    }
  }
};
