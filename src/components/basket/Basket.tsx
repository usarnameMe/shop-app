import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import BasketItem from "../basket/BasketItem";
import BasketToggle from "./BasketToggle";
import Boundary from "../common/Boundary";
import Modal from "../common/Modal";
import { CHECKOUT_STEP_1 } from "../../constants/routes";
import { auth, saveBasketItems } from "../../firebase/firebase";
import { calculateTotal, displayMoney } from "../../helpers/utils";
import useDidMount from "../../hooks/useDidMount";
import useModal from "../../hooks/useModal";
import { clearBasket } from "../../redux/actions/basketActions";
import styled from "styled-components";

interface BasketProps {
  onClose: () => void;
  addItem: () => void;
  removeItem: () => void;
}

const BasketWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 95vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
`;

const BasketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid #ddd;
`;

const BasketTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const Button = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const BasketEmpty = styled.div`
  text-align: center;
  margin: 2rem 0;

  .basket-empty-msg {
    font-size: 1rem;
    color: #888;
  }
`;

const BasketCheckout = styled.div`
  margin-top: auto;
  padding: 1rem 0;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .basket-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .basket-total-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .basket-total-amount {
    font-size: 1.5rem;
    color: #333;
  }

  button {
    width: 100%;
    background: #ddd;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const Basket: React.FC<BasketProps> = ({ onClose }) => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state: any) => ({
    basket: state.basket.items,
    user: state.auth,
  }));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const basketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (didMount && auth.currentUser && basket.length !== 0) {
      saveBasketItems(basket, auth.currentUser.uid)
        .then(() => {
          console.log("Item saved to basket");
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  }, [basket, didMount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        basketRef.current &&
        !basketRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const onCheckOut = () => {
    if (basket.length !== 0 && user) {
      document.body.classList.remove("is-basket-open");
      navigate(CHECKOUT_STEP_1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove("is-basket-open");
    navigate(CHECKOUT_STEP_1);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  return user && user.role === "ADMIN" ? null : (
    <Boundary>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <p className="text-center">You must sign in to continue checking out</p>
        <br />
        <div className="d-flex-center">
          <Button onClick={onCloseModal}>Continue shopping</Button>
          &nbsp;
          <Button onClick={onSignInClick}>Sign in to checkout</Button>
        </div>
      </Modal>
      <BasketWrapper ref={basketRef}>
        <BasketHeader>
          <BasketTitle>
            My Basket &nbsp;{" "}
            <span>
              ({basket.length} {basket.length === 1 ? "item" : "items"})
            </span>
          </BasketTitle>
          <BasketToggle>
            {({ onClickToggle }) => (
              <Button onClick={onClickToggle}>Close</Button>
            )}
          </BasketToggle>
          <Button disabled={basket.length === 0} onClick={onClearBasket}>
            Clear Basket
          </Button>
        </BasketHeader>
        {basket.length <= 0 && (
          <BasketEmpty>
            <h5 className="basket-empty-msg">Your basket is empty</h5>
          </BasketEmpty>
        )}
        {basket.map((product: any, i: number) => (
          <BasketItem key={`${product.id}_${i}`} product={product} />
        ))}
        <BasketCheckout>
          <div className="basket-total">
            <p className="basket-total-title">Subtotal Amount:</p>
            <h2 className="basket-total-amount">
              {displayMoney(
                calculateTotal(
                  basket.map((product: any) => product.price * product.quantity)
                )
              )}
            </h2>
          </div>
          <Button
            disabled={basket.length === 0 || pathname === "/checkout"}
            onClick={onCheckOut}
          >
            Check Out
          </Button>
        </BasketCheckout>
      </BasketWrapper>
    </Boundary>
  );
};

export default Basket;
