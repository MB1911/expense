import { NavLink } from "react-router-dom";
import {useState} from 'react';
import Report from '../modal/report';
const Sidebar = () =>{
const[cs,setCs]=useState("collapse");
const[acs,setAcs]=useState("nav-link collapsed");
const[show,setShow]=useState(false);

const handlemodel = () =>{
  setShow(true);
}
return(
	<aside id="sidebar" class="sidebar" >
    <Report show={show} handleClose={()=>setShow(false)}/>
    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <NavLink onClick={()=>{setAcs("nav-link collapsed");setCs("collapse")}} to="/dashboard" className={({isActive}) => isActive ? "nav-link" : "nav-link collapsed"}>
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li class="nav-item">
        <a href="#"   className={acs} data-bs-target="#components-nav" data-bs-toggle="collapse" >
          <i class="bi bi-menu-button-wide"></i><span>Expense</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class={`nav-content ${cs}`} data-bs-parent="#sidebar-nav">
          <li>
            <NavLink to="/addexpense" className={({isActive}) => isActive ? "active" : ""}>
              <span>Add Expense</span>
            </NavLink>
            <NavLink to="/viewexpense" className={({isActive}) => isActive ? "active" : ""}>
              <span>View Expense</span>
            </NavLink>
            	
          </li>
         </ul>
        </li>

         <li class="nav-item">
         <a className="nav-link collapsed" href="#" onClick={handlemodel}>
           <i class="bi bi-bar-chart-fill"></i>
           <span>Report</span>
         </a>
       </li>

      <li class="nav-item">
        <NavLink className="nav-link collapsed" to="/search">
          <i class="bi bi-search"></i>
          <span>Search</span>
        </NavLink>
      </li>

    
     </ul>
    </aside>
	)
}
export default Sidebar;