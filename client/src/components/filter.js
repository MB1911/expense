import React from 'react';
const Filter = ({type,search}) =>{
return(
		<div class="filter">
                  <a class="icon" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow" >
                    <li class="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    {type=="basic" && <>
                    <li><a class="dropdown-item" href="#">Today</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("month",new Date().getFullYear())}}>This Month</a>

                    </li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("year",new Date().getFullYear())}}>This Year</a></li>
                  </>}
                  {
                    type=="month" && <>


                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("01")}}>January</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("02")}}>Feb</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("03")}}>March</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search(new Date().getMonth()+1)}}>This Month</a>
                    </li>
                    </>
                  }
                  </ul>
                </div>
	)
}
export default Filter;