import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import Login from'./components/login';
import Dashboard from'./components/dashboard';
import Wrapper from './components/ui/wrapper';
import Addexpense from './components/addexpense';
import ViewExpense from './components/viewexpense';
import Search from './components/search';
import Register from './components/register';
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from './components/privateroute';
import {useUser} from './components/context/userinfo';
import NotFound from './components/ui/notfound';
function App() {


 
  return (
    <div className="App">
    <Wrapper>
      <Routes>
      	<Route path="/" element={<Login />}  />
        <Route path="register" element={<Register />} />
        <Route  path='/' element={<PrivateRoute/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addexpense" element={<Addexpense />} />
          <Route path="viewexpense" element={<ViewExpense />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
 	</Wrapper>   
 </div>
 
  );
}

export default App;
