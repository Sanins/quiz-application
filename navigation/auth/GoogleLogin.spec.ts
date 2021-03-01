import {GoogleLogin} from './GoogleLogin';

const mocks = {
  auth: jest.fn(),
  signInWithCredential: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
};

Object.defineProperty(mocks.auth, 'GoogleAuthProvider', {
  value: mocks.GoogleAuthProvider,
});

mocks.auth.mockReturnValue({
  signInWithCredential: mocks.signInWithCredential,
});

mocks.GoogleAuthProvider.credential.mockReturnValue({
  providerId: 'string',
  token: '123',
  secret: 'string',
});

jest.mock('@react-native-firebase/auth', () => {
  return () => mocks.auth;
});

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    signIn: jest.fn().mockReturnValue('123'),
  },
}));

describe('navigation > auth > GoogleLogin', () => {
  it('calls signInWithCredential', async () => {
    await GoogleLogin();
    expect(mocks.signInWithCredential).toHaveBeenCalled();
  });
});
