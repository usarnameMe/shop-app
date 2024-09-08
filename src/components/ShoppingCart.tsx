import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingBag } from 'react-icons/fa';
import Basket from './Basket';

const CartIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
`;

const ShoppingCart: React.FC = () => {
  const [isBasketOpen, setBasketOpen] = useState(false);
  const basketItemsCount = 1;

  const toggleBasket = () => {
    setBasketOpen(!isBasketOpen);
  };

  return (
    <CartIconContainer onClick={toggleBasket}>
      <FaShoppingBag size={24} />
      {basketItemsCount > 0 && <Badge>{basketItemsCount}</Badge>}
      {isBasketOpen && <Basket onClose={toggleBasket} />}
    </CartIconContainer>
  );
};

export default ShoppingCart;
