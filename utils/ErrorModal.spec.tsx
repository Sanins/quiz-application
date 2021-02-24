import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ErrorModal} from './ErrorModal';

//the modal component is automatically mocked by RN and apparently contains a bug which make the modal (and it's children) always visible in the test tree
//this is a hack which fix this issue
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal');

  return (props) => <Modal {...props} />;
});

describe('Utils > ErrorModal', () => {
  it('show and hide error modal', () => {
    const {getByText} = render(<ErrorModal />);

    expect(() => getByText(/hello world/i)).not.toBeNull();

    fireEvent.press(getByText(/hide modal/i));
    expect(() => getByText(/hide modal/i)).toThrow(/no instances found/i); //modal is closed again
  });
});
