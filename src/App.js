import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';

const NotFound = () => {
  return <h2>404 - Not Found</h2>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
      <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
