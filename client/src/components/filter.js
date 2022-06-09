import React from 'react';
const Filter = ({type,search}) =>{
return(
		<div class="filter" >
                  <a class="icon" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow" style={{ overflow: "auto",maxHeight:"200px"}}>
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

                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search(new Date().getMonth()+1)}}>This Month</a>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("01")}}>January</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("02")}}>Feb</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("03")}}>March</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("04")}}>April</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("05")}}>May</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("06")}}>June</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("07")}}>July</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("08")}}>Augast</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("09")}}>September</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("10")}}>October</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("11")}}>November</a></li>
                    <li><a class="dropdown-item" href="#" onClick={(e)=>{e.preventDefault();search("12")}}>December</a></li>
                    </li>
                    </>
                  }
                  </ul>
                </div>
	)
}
export default Filter;