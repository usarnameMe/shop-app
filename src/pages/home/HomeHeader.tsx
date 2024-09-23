import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
`;

const LeftDiv = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #666;
  line-height: 1.5;
`;

const Button = styled.button`
  max-width: 50%;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #555;
  }
`;

const RightDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const HomeHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/shop");
  };

  return (
    <Container>
      <LeftDiv>
        <Title>Discover the Best Shoes</Title>
        <Description>
          Find the perfect pair of shoes that suits your style and comfort.
          Explore our wide collection now.
        </Description>
        <Button onClick={handleShopNowClick}>Shop Now</Button>
      </LeftDiv>
      <RightDiv>
        <Image
          src="https://images.pexels.com/photos/4271694/pexels-photo-4271694.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Shoes Banner"
        />
      </RightDiv>
    </Container>
  );
};

export default HomeHeader;
