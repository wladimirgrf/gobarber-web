import React, { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FunctionComponent = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required.'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Password must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, passwordConfirmation } = data;
        const token = new URLSearchParams(location.search).get('token');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          passwordConfirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Reset password complete!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Reset password error!',
          description: 'We could not reset your password. Try again later.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset your password</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />

            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirm your Password"
            />

            <Button type="submit">Save New Password</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
