//Dashboard 
import Card from './dashcard';
import Sidebar from './ui/sidebar';
import Graph from './graph/graph';
import Pie from './graph/pie';
import Header from './ui/header';
import Viewtransaction from './viewtransaction';
import Alltransaction from './alltransaction';
import React from 'react';
import {useEffect,useState} from 'react';
import WithData from './HOC/withdata';
import WithLoader from './context/utill';
import {useUser} from './context/userinfo';
import Expensesaving from './expensesaving';
import withLoader,{getData,getPData,date_formatter,date_seter,formater,getfullmonth} from './context/utill';
const Dashboard = (props) =>{

//HOC withData to call api which is passed as a parmeter
const Latesttransaction = WithData(Viewtransaction,"/expense/group");
//all transaction
const Alltransactionwithdata = WithData(Alltransaction,"/expense/alltransaction");
//Bar chart
const Graphwithdata = WithData(Graph,"/expense/expensebymonth");
//Pie chart
const Piewithdata = WithData(Pie,"/expense/sortbymonth");
//Top level balance card
const Balance = WithData(Card,"/expense/alltransaction");

//stop loading spinner with withLoader HOC
const[mybalance,setMybalance]=useState([]);
const {islogin,checklogin} = useUser();
useEffect(async()=>{
checklogin();
const req = await fetch("/expense/balance");
const res = await req.json();
setMybalance(res);
console.log(res,"okk");
setTimeout(()=>{
props.setIsloading(false);
},1000)
},[])

const handlereport = async() =>{

	const req= await fetch("/expense/report",
		{
			method:"POST",
			body:JSON.stringify({month:new Date().getMonth()+1,year:new Date().getFullYear()}),
			 headers: {'Content-Type': 'application/json'}
   		})
	
    const downloadUrl = URL.createObjectURL(await req.blob());
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "file.xlsx";
    a.click();
}
return(
	 <>
	 
	 {!props.isloading &&
	 <section class="section dashboard">
      <div class="row">
       	<div className="col-lg-8">
  			<div className="row">
	   		<Balance  title="Balance"  icon="bi bi-clipboard-plus" bg="text-success"/>
	   		<Balance  title="Income"  icon="bi bi-clipboard-plus" bg="text-info"/>
	   		<Balance  title="Expense"  icon="bi bi-clipboard-minus" bg="text-danger"/>
	   		<div className="col-12">
	   			<Graphwithdata />
	   		</div>
	   		<div className="col-12">
	   			<Alltransactionwithdata />
	   		</div>
	   		
	   	</div>
	  </div>
	  <div className="col-lg-4">
	   	<Latesttransaction  />
	   	<Piewithdata/>
	   	<Expensesaving />
	  </div>
	  </div>
	 </section>	
	 }
	 </>
	)
}
export default WithLoader(Dashboard);