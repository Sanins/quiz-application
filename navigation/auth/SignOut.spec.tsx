import {SignOut} from './SignOut';

const mocks = {
  signOut: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signOut: mocks.signOut,
  });
});

describe('navigation > auth > SignOut', () => {
  beforeEach(() => {
    mocks.signOut.mockReset();
  });

  it('calls signOut', async () => {
    await SignOut();
    expect(mocks.signOut).toBeCalledTimes(1);
  });
});
