import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByTestId } = render(<Input name="email" placeholder="Email" />);

    expect(getByTestId('component-input')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByTestId } = render(<Input name="email" placeholder="Email" />);

    const inputElement = getByTestId('component-input');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByTestId } = render(<Input name="email" placeholder="Email" />);

    const inputElement = getByTestId('component-input');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'john@example.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
