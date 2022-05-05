import Header from './header';
import Sidebar from './sidebar';
import {useState,useEffect} from 'react';
import React from 'react';
import {useUser} from '../context/userinfo';
import { useLocation } from 'react-router-dom';
const Wrapper = (props) =>{

const[data,setData]=useState();
const {islogin,checklogin} = useUser();
const location = useLocation();
useEffect(async()=>{
const req = await fetch("/expense/proflie");
const res = await req.json();
if(res)
{
	checklogin();
}
},[])
return(
	<>
	{islogin  && 
	  <main id="main" class="main">
	  <Header />
	  <Sidebar />
	  <div class="pagetitle">
      <h1 style={{textTransform: 'capitalize'}}>{location.pathname.split("/")[1]}</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">{location.pathname.split("/")[1]}</li>
        </ol>
      </nav>
    </div>
	  {props.children}
	   </main>
	}
	{!islogin  && <>{props.children}</>}	
	 
	</> 

	)
}
export default Wrapper;