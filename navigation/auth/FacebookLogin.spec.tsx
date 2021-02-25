const mocks = {
  // credential: jest.fn(),
  signInWithCredential: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => ({
  auth: {
    FacebookAuthProvider: {
      credential: jest.fn(),
    },
  },
}));

jest.mock('react-native-fbsdk', () => ({
  LoginManager: {
    logInWithPermissions: jest.fn().mockResolvedValue(''),
  },
  AccessToken: {
    getCurrentAccessToken: jest.fn().mockResolvedValue('123'),
  },
}));

import {FacebookLogin} from './FacebookLogin';

describe('navigation > auth > FacebookLogin', () => {
  beforeEach(() => {
    mocks.signInWithCredential.mockReset();
  });

  it('calls signInWithCredential', async () => {
    await FacebookLogin();
    expect(mocks.signInWithCredential).toBeCalledTimes(1);
  });
});
