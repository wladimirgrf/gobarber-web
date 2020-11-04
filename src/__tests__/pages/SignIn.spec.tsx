import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email-input');
    const passwordField = getByTestId('password-input');
    const buttonElement = getByTestId('login-button');

    fireEvent.change(emailField, {
      target: { value: 'john@example.com' },
    });

    fireEvent.change(passwordField, {
      target: { value: '12345' },
    });

    fireEvent.click(buttonElement);

    expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
