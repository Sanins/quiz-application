const mocks = {
  signInWithCredential: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => ({
  auth: {
    GoogleAuthProvider: {
      credential: jest.fn(),
    },
  },
}));

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    signIn: jest.fn().mockReturnValue('123'),
  },
}));

import {GoogleLogin} from './GoogleLogin';

describe('navigation > auth > GoogleLogin', () => {
  beforeEach(() => {
    mocks.signInWithCredential.mockReset();
  });

  it('calls signInWithCredential', async () => {
    // auth.GoogleAuthProvider.credential.mockReturnValue(...);
    await GoogleLogin();
    expect(mocks.signInWithCredential).toBeCalledTimes(1);
  });
});
