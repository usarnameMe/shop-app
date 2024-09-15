import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, googleProvider, signInWithPopup } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('User registered successfully!');
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed up with Google!');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  return (
    <Container>
      <Title>Sign up to Shopy</Title>
      <Form onSubmit={handleSignUp}>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <AuthButton type="submit">Sign Up</AuthButton>
      </Form>
      <Divider>OR</Divider>
      <GoogleButton onClick={handleGoogleSignUp}>Continue with Google</GoogleButton>
      {error && <p style={{ color: 'red' }}>Something went wrong </p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <RedirectText>
        Already have an account? <a href="/signin">Sign In</a>
      </RedirectText>
    </Container>
  );
};

export default SignUp;
