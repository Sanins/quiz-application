import React from 'react';
import {render} from '@testing-library/react-native';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth', () => {
  return {
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

describe('Utils > ErrorModal', () => {
  it('show and hide error modal', () => {
    const login = jest.fn().mockReturnValue('142');
    render(<AuthContext.Provider value={{login}} />);

    expect(auth().signInWithEmailAndPassword).toBeCalledWith('142');
  });
});
