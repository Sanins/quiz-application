import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {GoogleLogin} from '../navigation/auth/GoogleLogin';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({navigation}) => {
  interface firestoreSocialDataTypes {
    id: string;
    facebook?: boolean;
    google?: boolean;
    appLogin?: boolean;
  }

  const {user, logout, facebookLogin} = useContext(AuthContext);
  const [
    firestoreSocialData,
    setfirestoreSocialData,
  ] = useState<firestoreSocialDataTypes>({
    id: '',
    facebook: false,
    google: false,
    appLogin: false,
  });

  const ref = firestore().collection('users');

  const loginViaFacebook = async () => {
    await facebookLogin().then(() => {
      ref.doc(user.uid).update({id: user.uid, facebook: true});
    });
  };

  const loginViaGoogle = async () => {
    await GoogleLogin().then(() => {
      ref.doc(user.uid).update({id: user.uid, google: true});
    });
  };

  const verifyEmail = async () => {
    auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const removeAccount = async () => {
    auth()
      .currentUser.delete()
      .catch(function (e) {
        console.log(e);
      });
  };

  const unlinkAccount = async (accountType) => {
    let providerId;
    if (accountType === 'facebook') {
      providerId = 'facebook.com';
    } else if (accountType === 'google') {
      providerId = 'google.com';
    }
    user
      .unlink(providerId)
      .then(() => {
        if (providerId === 'facebook.com') {
          ref.doc(user.uid).update({id: user.uid, facebook: false});
        } else if (providerId === 'google.com') {
          ref.doc(user.uid).update({id: user.uid, google: false});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    return ref.where('id', '==', user.uid).onSnapshot((querySnapshot) => {
      let list = firestoreSocialData;
      querySnapshot.forEach((doc) => {
        const {facebook, google, appLogin} = doc.data();
        list = {
          id: doc.id,
          facebook,
          google,
          appLogin,
        };
      });

      setfirestoreSocialData(list);
    });
  }, []);

  return (
    <View style={styles.container}>
      {user.displayName && <Text style={styles.text}>{user.displayName}</Text>}
      <Text style={styles.text}>This is the Profile Screen</Text>
      {firestoreSocialData.facebook !== true && (
        <Button
          title="Connect facebook account"
          onPress={() => loginViaFacebook()}
        />
      )}
      {firestoreSocialData.facebook === true && (
        <Button
          title="Unlink Facebook Account"
          onPress={() => unlinkAccount('facebook')}
        />
      )}
      {firestoreSocialData.google !== true && (
        <Button
          title="Connect google account"
          onPress={() => loginViaGoogle()}
        />
      )}
      {firestoreSocialData.google === true && (
        <Button
          title="Unlink google Account"
          onPress={() => unlinkAccount('google')}
        />
      )}
      {user.emailVerified === false ? (
        <Button title="Verify Email" onPress={() => verifyEmail()} />
      ) : (
        <Text>Email has been verified</Text>
      )}
      <Button title="Delete Account" onPress={() => removeAccount()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <FormButton
        bgColor="light"
        buttonTitle="Logout"
        onPress={() => logout()}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
