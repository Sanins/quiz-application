import {Register} from './Register';

const mocks = {
  auth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    auth: mocks.auth,
    createUserWithEmailAndPassword: mocks.createUserWithEmailAndPassword,
  });
});

describe('navigation > auth > Register', () => {
  beforeEach(() => {
    mocks.createUserWithEmailAndPassword.mockReset();
  });

  it('calls createUserWithEmailAndPassword with email and password', async () => {
    const email = 'example@gmail.com';
    const password = '123';
    await Register(email, password);
    expect(mocks.createUserWithEmailAndPassword).toBeCalledWith(
      email,
      password,
    );
  });

  it('throws error when email is already in use', async () => {
    const error = {code: 'auth/email-already-in-use'};
    mocks.createUserWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Register(email, password);
    expect(result).toEqual('Email already in use');
  });

  it('throws error when the email is invalid', async () => {
    const error = {code: 'auth/invalid-email'};
    mocks.createUserWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Register(email, password);
    expect(result).toEqual('Email address is not valid');
  });

  it('throws error when password is less than 6 characters', async () => {
    const error = {code: 'auth/weak-password'};
    mocks.createUserWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Register(email, password);
    expect(result).toEqual('The password requires a minimum of 6 chars');
  });

  it('throws default error', async () => {
    const error = 'o dear...';
    mocks.createUserWithEmailAndPassword.mockRejectedValue(error);
    const email = 'example@gmail.com';
    const password = '123';

    const result = await Register(email, password);
    expect(result).toEqual('Error');
  });
});
