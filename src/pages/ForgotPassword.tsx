import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, sendPasswordResetEmail } from '../firebase/firebase';

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

const Input = styled.input`
  width: 93%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const ResetButton = styled.button`
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

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
      setEmail('');
    } catch (err: any) {
      console.error('Error resetting password:', err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please check the email address and try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format. Please enter a valid email address.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <ResetButton onClick={handleResetPassword}>Send Reset Email</ResetButton>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
};

export default ForgotPassword;
