import React from 'react';
import {render} from '@testing-library/react-native';
import {ErrorModal} from './ErrorModal';

describe('Hello', () => {
  it('renders the correct message', () => {
    const {queryByText} = render(<ErrorModal />);
    expect(queryByText('Hello World!')).not.toBeNull();
  });
});
