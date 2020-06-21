import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FunctionComponent = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Log In</h1>

        <Input name="email" icon={FiMail} placeholder="Email" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Log In</Button>

        <a href="forgot">Forgot password?</a>
      </form>

      <a href="SignUp">
        <FiLogIn />
        Sign up today.
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
