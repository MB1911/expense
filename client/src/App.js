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
function App() {


const[data,setData]=useState();
const {islogin,checklogin} = useUser();
useEffect(async()=>{
const req = await fetch("/expense/proflie");
const res = await req.json();
setData(res);
if(res)
{
  checklogin();
}
},[])
 
  return (
    <div className="App">
    <Wrapper>
      <Routes>
      	<Route path="/" element={<Login />}  />
        <Route path="register" element={<Register />} />
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route path="addexpense" element={<Addexpense />} />
            <Route path="viewexpense" element={<ViewExpense />} />
            <Route path="search" element={<Search />} />
        </Route>
      </Routes>
 	</Wrapper>   
 </div>
 
  );
}

export default App;
