import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  padding: 30px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ToggleVisibilityIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #333;
`;

const AuthButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #333;
  }
`;

const GoogleButton = styled(AuthButton)`
  background-color: #4285f4;

  &:hover {
    background-color: #357ae8;
  }
`;

const Divider = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #999;
`;

const RedirectText = styled.p`
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #4285f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: -10px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #4285f4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed in with Google!');
    } catch (err) {
      if ((err as Error).message.includes('auth/popup-closed-by-user')) {
        setError('The popup was closed before the sign-in was completed. Please try again.');
      } else {
        setError((err as Error).message);
      }
    }
  };

  return (
    <Container>
      <Title>Sign in to Shopy</Title>
      <Form onSubmit={handleSignIn}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <ToggleVisibilityIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </ToggleVisibilityIcon>
        </InputWrapper>
        <ForgotPasswordLink to="/forgot-password">Forgot Password?</ForgotPasswordLink>
        <AuthButton type="submit">Sign In</AuthButton>
      </Form>
      <Divider>OR</Divider>
      <GoogleButton onClick={handleGoogleSignIn}>Continue with Google</GoogleButton>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RedirectText>
        Don't have an account? <a href="/signup">Sign Up</a>
      </RedirectText>
    </Container>
  );
};

export default SignIn;
