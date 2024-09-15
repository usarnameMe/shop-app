import React from 'react';

interface BoundaryProps {
  children: React.ReactNode;
}

const Boundary: React.FC<BoundaryProps> = ({ children }) => {
  return <div>{children}</div>; 
};

export default Boundary;
