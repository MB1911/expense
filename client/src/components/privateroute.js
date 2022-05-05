import React,{useEffect,useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useUser} from './context/userinfo';

const PrivateRoute = () => {
const{islogin,checklogin}=useUser();
const[user,setUser]=useState(localStorage.getItem("username"));

	
    const auth = null; // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return user ? <Outlet /> : <Navigate to="/" />;
    }
export default PrivateRoute;