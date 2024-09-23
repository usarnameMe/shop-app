import React from "react";
import styled from "styled-components";

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

const FeatHeader: React.FC = () => {
  return (
    <Container>
      <LeftDiv>
        <Title>Make Your Best Choice</Title>
        <Description>
          Explore our wide collection now.
        </Description>
      </LeftDiv>
      <RightDiv>
        <Image
          src="https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Shoes Banner"
        />
      </RightDiv>
    </Container>
  );
};

export default FeatHeader;
