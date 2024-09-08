import React from 'react';
import { useParams } from 'react-router-dom';

type ProductParams = {
  id: string;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<ProductParams>();

  return <div>Product Details for Product ID: {id}</div>;
};

export default ProductDetails;
