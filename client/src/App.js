import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePages from './pages/HomePages';
import Register from './pages/Register';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePages /></ProtectedRoutes>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to='/login' />;
  }
}
export default App;
