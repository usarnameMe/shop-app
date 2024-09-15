import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, googleProvider, signInWithPopup } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  padding: 20px;
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
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AuthButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

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

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed in with Google!');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
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
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <AuthButton type="submit">Sign In</AuthButton>
      </Form>
      <Divider>OR</Divider>
      <GoogleButton onClick={handleGoogleSignIn}>Continue with Google</GoogleButton>
      {error && <p style={{ color: 'red' }}>Invalid Credentials</p>}
      <RedirectText>
        Don't have an account? <a href="/signup">Sign Up</a>
      </RedirectText>
    </Container>
  );
};

export default SignIn;
