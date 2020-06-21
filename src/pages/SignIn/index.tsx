import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FunctionComponent = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Log In</h1>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Log In</button>

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
