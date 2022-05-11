import {useEffect,useState} from 'react';
import {Link,useNavigate,NavLink} from 'react-router-dom';
import {useUser} from '../context/userinfo';
const Header = () =>{


const {setIslogin} = useUser();
const[data,setData]=useState();
const hist = useNavigate();
useEffect(async()=>{
const req = await fetch("/expense/proflie");
const res = await req.json();
setData(res);
console.log(res);
},[])

const handlelogout = async(e) =>{
  e.preventDefault();
  localStorage.removeItem("username");
  const req = await fetch("/expense/logout");
  const res = await req.text();
  if(res=="logout")
  {
    setIslogin(false);
    hist("/");
  }
}
return(
	<header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt="" />
        <span class="d-none d-lg-block">Expense Master</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn"></i>
    </div>

    

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
          <a class="nav-link nav-icon search-bar-toggle " href="#">
            <i class="bi bi-search"></i>
          </a>
        </li>

      
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src={data && data.pic ? data.pic : "/img/images.jpeg"} alt="Profile" class="rounded-circle" />
            <span class="d-none d-md-block dropdown-toggle ps-2">{data ? data.username : "user"}</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            
            
            <li className="text-center">
              <a class="dropdown-item d-flex align-items-center" href="#" onClick={handlelogout}>
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>
	)
}
export default Header;