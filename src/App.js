import './App.css';
import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';



// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/products' element={<Products />} />
   

//       </Routes>
//     </BrowserRouter>
//   );
// }

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
