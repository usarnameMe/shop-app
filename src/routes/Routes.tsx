import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Featured from '../pages/featured/Featured';
import Recommended from '../pages/recommended/Recommended';



const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/featured" element={<Featured/>} />
    <Route path="/recommended" element={<Recommended/>} />
  </Routes>
);

export default AppRoutes;
