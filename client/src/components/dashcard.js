//Top card in dashboard
import {formater} from './context/utill';
import {useState,useEffect} from 'react';
const Dashcard = (props) =>{
   //Expense
  const[data,setData]=useState([]);
  //Balance
  const[balance,setBalance]=useState([]);
  //Income
  const[income,setIncome]=useState([]);
  useEffect(async()=>{  
    //count total expense for current month
    const total_expense = props.fdata.map(d=>d.ammount < 0 && d.ammount).reduce((a,b)=>a+b,0);
    setData(total_expense);
    //count total income for current month
    const total_income = props.fdata.map(d=>d.ammount > 0 && d.ammount).reduce((a,b)=>a+b,0);
    setIncome(total_income);
    //count balance form expense and income
    const total_balance = total_income + total_expense;
    setBalance(total_balance);
},[props]) 
return(
	<div class="col-xxl-4 col-xl-12">
              <div class="card info-card customers-card">
                <div class="card-body">
                  <h5 class="card-title">{props.title}<span>| This Month</span></h5>
                  <div class="d-flex align-items-center">
                    <div class={`card-icon rounded-circle  d-flex align-items-center justify-content-center ${props.bg}`}>
                      <i class={props.icon}></i>
                    </div>
                    <div class="ps-3">
                      {props.type=="gen"  && <h6>{props.ammount}</h6>}
                      {props.title=="Expense" && <h6>{formater(Math.abs(data))}</h6> }
                      {props.title=="Income" && <h6>{formater(income)}</h6> }
                      {props.title=="Balance" && <h6>{formater(Math.abs(balance))}</h6>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
	)
}
export default Dashcard;