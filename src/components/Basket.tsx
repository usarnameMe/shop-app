import React from 'react';
import styled from 'styled-components';

const BasketContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  z-index: 1000;
`;

const BasketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const BasketContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BasketFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface BasketProps {
  onClose: () => void;
}

const Basket: React.FC<BasketProps> = ({ onClose }) => (
  <BasketContainer>
    <BasketHeader>
      <h2>My Basket</h2>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </BasketHeader>
    <BasketContent>
      <div>Your basket is empty</div>
    </BasketContent>
    <BasketFooter>
      <button>Clear Basket</button>
      <button>Checkout</button>
    </BasketFooter>
  </BasketContainer>
);

export default Basket;
