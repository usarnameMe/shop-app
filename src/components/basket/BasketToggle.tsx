import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

interface BasketToggleProps {
  children: (props: { onClickToggle: () => void }) => React.ReactNode;
}

const BasketToggle: React.FC<BasketToggleProps> = ({ children }) => {
  const basket = useSelector((state: any) => state.basket.items);

  const onClickToggle = useCallback(() => {
    if (document.body.classList.contains('is-basket-open')) {
      document.body.classList.remove('is-basket-open');
    } else {
      document.body.classList.add('is-basket-open');
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('.basket');
      const toggle = target.closest('.basket-toggle');
      const closeToggle = target.closest('.basket-item-remove');

      if (!closest && document.body.classList.contains('is-basket-open') && !toggle && !closeToggle) {
        document.body.classList.remove('is-basket-open');
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="basket-toggle">
      {children({ onClickToggle })}
      {basket.length > 0 && (
        <div className="notification-icon">
          {basket.length}
        </div>
      )}
    </div>
  );
};

BasketToggle.propTypes = {
  children: PropTypes.func.isRequired,
};

export default BasketToggle;
