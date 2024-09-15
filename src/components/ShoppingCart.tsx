import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingBag } from 'react-icons/fa';
import Basket from './basket/Basket';

const CartIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ShoppingCart: React.FC = () => {
  const [isBasketOpen, setBasketOpen] = useState(false);
  const [basketItemsCount, setBasketItemsCount] = useState(0); 

  const toggleBasket = () => {
    setBasketOpen(!isBasketOpen);
  };

  const addItemToBasket = () => {
    setBasketItemsCount(prevCount => prevCount + 1);
  };

  const removeItemFromBasket = () => {
    setBasketItemsCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <CartIconContainer onClick={toggleBasket}>
      <FaShoppingBag size={24} />
      {basketItemsCount > 0 && (
        <span style={{ position: 'absolute', top: '-5px', right: '-10px', backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '0.01rem 0.03rem', fontSize: '0.8rem', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {basketItemsCount}
        </span>
      )}
      {isBasketOpen && (
        <Basket
          onClose={toggleBasket}
          addItem={addItemToBasket}
          removeItem={removeItemFromBasket}
        />
      )}
    </CartIconContainer>
  );
};

export default ShoppingCart;
