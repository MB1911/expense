//All transaction card on dashboard
import {useEffect,useState} from 'react';
import Card from './ui/card';
import Filter from './filter';
import ExpenseTable from './expensetable';
import {formater,date_formatter,sort} from './context/utill';
const Alltransaction = (props) =>{

//Display data
const[data,setData]=useState([]);

//props.fdata from with withData HOC
useEffect(async()=>{
setData(props.fdata);
},[props])	

//filter by year and month
const filterdata = async(by,value) =>{

if(by=="year")
{
	const req1 = await fetch("/expense/filter",{
	method:"POST",
	headers: { 'Content-Type': 'application/json' },
	body:JSON.stringify({by:value})
});
	const res1 = await req1.json();
	setData(res1);	
}
if(by=="month")
{
	
setData(props.fdata);
}

}

//sort data
const handlesort = (field,order) =>{
	const {sdata:result} = sort(data,field,order);
	const newar = [...result];
	setData(newar);
	console.log(newar);
}
return(
<Card title="All Transaction" subtitle="This Month">
	<Filter search={filterdata} type="basic"/>
	{data.length > 0 ?
	<ExpenseTable data={data} className="table table-borderless" handlesort={handlesort}/>:
	<p className="text-muted">No record to display</p>
	}
</Card>
	)
}
export default Alltransaction;