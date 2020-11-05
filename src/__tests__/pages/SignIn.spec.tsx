import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
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

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email-input');
    const passwordField = getByTestId('password-input');
    const buttonElement = getByTestId('login-button');

    fireEvent.change(emailField, {
      target: { value: 'not-valid-email' },
    });

    fireEvent.change(passwordField, {
      target: { value: '12345' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

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

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
