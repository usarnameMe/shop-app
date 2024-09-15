import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  &:after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-color: #ccc transparent #ccc transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

const Spinner: React.FC = () => <SpinnerWrapper />;

export default Spinner;
