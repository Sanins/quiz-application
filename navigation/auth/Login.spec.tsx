import {Login} from './Login';

const mocks = {
  signInWithEmailAndPassword: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    signInWithEmailAndPassword: mocks.signInWithEmailAndPassword,
  });
});

describe('navigation > auth > Login', () => {
  beforeEach(() => {
    mocks.signInWithEmailAndPassword.mockReset();
  });

  it('calls signInWithEmailAndPassword with email and password', async () => {
    const email = 'example@gmail.com';
    const password = '123';
    await Login(email, password);
    expect(mocks.signInWithEmailAndPassword).toBeCalledWith(email, password);
  });

  it('throws error when email is invalid', async () => {
    const error = {code: 'auth/invalid-email'};
    mocks.signInWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Login(email, password);
    expect(result).toEqual('Invalid email');
  });

  it('throws error when password is invalid', async () => {
    const error = {code: 'auth/wrong-password'};
    mocks.signInWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Login(email, password);
    expect(result).toEqual('Invalid password');
  });

  it('throws error when user is disabled', async () => {
    const error = {code: 'auth/user-disabled'};
    mocks.signInWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Login(email, password);
    expect(result).toEqual('User has been disabled');
  });

  it('throws error when no user is found with the given email', async () => {
    const error = {code: 'auth/user-not-found'};
    mocks.signInWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Login(email, password);
    expect(result).toEqual('No user found with this email');
  });

  it('throws default error', async () => {
    const error = 'o dear...';
    mocks.signInWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Login(email, password);
    expect(result).toEqual('Error');
  });
});
