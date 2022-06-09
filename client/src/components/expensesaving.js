import Card from './ui/card';
import {useState,useEffect} from 'react';
import withLoader,{getData,getPData,date_formatter,date_seter,formater,getfullmonth} from './context/utill';
import {useUser} from './context/userinfo';
const Expensesaving = (props) =>{

const[mybalance,setMybalance]=useState([]);
const {islogin,checklogin} = useUser();
useEffect(async()=>{
checklogin();
const req = await fetch("/expense/balance");
const res = await req.json();
setMybalance(res);
console.log(res);
setTimeout(()=>{
props.setIsloading(false);
},1000)
},[])	
return(
	<Card title="Saving && Expense" subtitle="this year">
	
		<table className="table table-borderless">
	   			<thead>
	   					<tr>
	   							<th>Month</th>
	   							<th>Expense</th>
	   							<th>Saving</th>

	   					</tr>
	   			</thead>
	   			<tbody>
	   				{mybalance && mybalance.map(m=><tr><td>{getfullmonth(m.month-1)}</td><td>{formater(m.totalexpense)}</td><td>{formater(m.totalsaving)}</td></tr>)}
	   			</tbody>
	   			</table>

	</Card>
	)
}
export default Expensesaving;