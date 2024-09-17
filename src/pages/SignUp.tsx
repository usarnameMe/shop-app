import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from '../firebase/firebase';

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

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError('An account with this email already exists. Please use a different email or sign in.');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('User registered successfully!');
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      console.error('Error during sign up:', err);
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('auth/operation-not-allowed')) {
        setError('Sign-up method is not allowed. Please enable Email/Password in Firebase.');
      } else if (errorMessage.includes('auth/weak-password')) {
        setError('Password should be at least 6 characters long.');
      } else if (errorMessage.includes('auth/invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errorMessage.includes('auth/network-request-failed')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed up with Google!');
    } catch (err) {
      console.error('Error during Google sign up:', err);
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('auth/popup-closed-by-user')) {
        setError('The sign-in popup was closed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container>
      <Title>Sign up to Shopy</Title>
      <Form onSubmit={handleSignUp}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <ToggleVisibilityIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </ToggleVisibilityIcon>
        </InputWrapper>
        <AuthButton type="submit">Sign Up</AuthButton>
      </Form>
      <Divider>OR</Divider>
      <GoogleButton onClick={handleGoogleSignUp}>Continue with Google</GoogleButton>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <RedirectText>
        Already have an account? <a href="/signin">Sign In</a>
      </RedirectText>
    </Container>
  );
};

export default SignUp;
