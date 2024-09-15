import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import ShoppingCart from './ShoppingCart';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 0.5rem;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #555;
  background-color: transparent;
  color: #555;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
    color: #fff;
  }
`;

const Navbar: React.FC = () => (
  <NavbarContainer>
    <Logo>
      <Link to="/">SHOPY</Link>
    </Logo>
    <NavLinks>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/featured">Featured</Link>
      <Link to="/recommended">Recommended</Link>
    </NavLinks>
    <SearchContainer>
      <FaSearch />
      <SearchInput type="text" placeholder="Search product..." />
    </SearchContainer>
    <IconsContainer>
      <ShoppingCart />
      <Button>Sign Up</Button>
      <Button>Sign In</Button>
    </IconsContainer>
  </NavbarContainer>
);

export default Navbar;
