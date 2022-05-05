import Card from './ui/card';
import {useEffect,useState,useRef} from 'react';
import {getData,date_formatter,date_seter,formater,sort} from './context/utill';
import withLoader from './context/utill';
import {NavLink} from 'react-router-dom';
import ExpenseTable from './expensetable';
import ExpenseForm from './expenseform';
import Tablefilter from './tablefilter';
import EditModal from './modal/editmodal';
import Deleteconfirm from './modal/deleteconfirm';
import Message from './modal/message';
const Addexpense = (props) =>{

//Display table for transaction	
const[data,setData]=useState([]);

//for category list	
const[type,setType]=useState([]);

//for number of record to display
const[entery,setEntery]=useState(5);

//total expense of the month
const[expense,setExpense]=useState(0);

//credit of the month
const[credit,setCredit]=useState(0);

//filter for category
const[groupby,setGroupBy]=useState("all");

//number of record
const[total,setTotal]=useState(0);

//Ref for catgory,ammount and date
const category = useRef();
const ammount = useRef();
const date = useRef();

useEffect(async()=>{

//get category	
const cat = await getData({url:"/expense/view/type"});
setType(cat);
//check for groupby filter
if(groupby=="all")
{
	let rec = parseInt(entery) + 1;
	const tra_data = await getData({url:"/expense/alltransaction",method:"POST",body:{month:new Date().getMonth()+1,year:new Date().getFullYear(),num:rec}})	
	setData(tra_data);
	console.log(tra_data.length,entery+1);
	setTotal(tra_data.length);
}
else
{
	const filter = await getData({url:"/expense/expensebycategory",method:"POST",body:{cat:groupby}});
	setData(filter);
}
//display total expense
infobar();

//stop loader
props.setIsloading(false);
},[entery,groupby])

//display edit modal
const[show,setShow]=useState(false);

//send edit data
const[editdata,setEditdata]=useState([]);

//handle edit modal
const handleedit = async(id) =>{
setShow(true);
const demo = await getData({url:"/expense/by/id",method:"POST",body:{id:id}});
setEditdata(demo);
}


//get entry  to display 
const rem = total % 5;
const limit = rem == 0 ? total : 5+rem;
const page_array =[];
if(rem==0)
{
	for(let i=5;i<limit;i+=5)
	{
		page_array.push(i);
	}
}
else
{
	for(let i=5;i<total;i+=rem)
	{
		page_array.push(i);
	}
	page_array.push(total);	
}

//sort function
const handlesort = (field,order) =>{
	const {sdata:result} = sort(data,field,order);
	const newar = [...result];
	setData(newar);
}

//set group by filter
const handlecat = (e) =>{
	setGroupBy(e.target.value);
}

//Add transaction form
const handlesubmit = async(e,category,ammount,date) =>{
	e.preventDefault();
	const body = {type:category,ammount:ammount,date:date}
	const add_tra = await getData({url:"/expense/transaction",method:"POST",body:body});
	await display();
	setMshow(true);
	await infobar();
}

//Display  record 
const display = async() =>{
	const tra_data = await getData({url:"/expense/alltransaction",method:"POST",body:{month:new Date().getMonth()+1,year:new Date().getFullYear(),num:6}})
	setData(tra_data);
}

//Delete transaction
const handledelete = async(fdata,id) =>{

	const req = await getData({url:"/expense/delete",method:"POST",body:{id:id}});
	const reduce_amt = data.filter(d=>d._id == id); 
	setExpense((prev)=>prev-reduce_amt[0].ammount);
	const newdata = data.filter(d=>d._id !== id);
	setData(newdata);
	setDel(false);
}

//display total exoense and credit
const infobar = async() =>{

	const tra_data = await getData({url:"/expense/alltransaction",method:"POST",body:{month:new Date().getMonth()+1,year:new Date().getFullYear()}})
	const total_expense = tra_data.map(d=>d.ammount < 0 && d.ammount).reduce((a,b)=>a+b,0);
	const total_credit = tra_data.map(d=>d.ammount > 0 && d.ammount).reduce((a,b)=>a+b,0);
	setExpense(total_expense);
	setCredit(total_credit);
	setTotal(tra_data.length)
}

//display how many record are display or total expense if groupby and category
const footerbar = () =>{


	if(groupby !== "all")
	{
		const total_expense_cat = data.map(d=>d.ammount < 0 && d.ammount).reduce((a,b)=>a+b,0);
		return <p className="text-dark">Total Expense for {groupby} {total_expense_cat}</p>
	}
	else
	{
		if(total > entery)
		{
			return <p>Showing {entery} entery out of {total}</p>	
		}
		else
		{
			return <p>Showing {total} entry</p>
		}
		
	}
	
}

//close edit modal
const handleClose = () =>{
	setShow(false);
}

//show delete modal
const[del,setDel]=useState(false);

//show message modal
const[mshow,setMshow]=useState(false);

//id for delete record
const[did,setDid]=useState(0);

//handler for delete modal
const handledel = (id) =>{	
setDel(true);
setDid(id);
}

return(
	<div className="container">
		<div className="row">
			<div className="col-md-12 ">
				<EditModal show={show} handleClose={handleClose} editdata={editdata} type={type} setdata={display}/>
				<Deleteconfirm show={del} data={data} handleClose={()=>setDel(false)} handledelete={handledelete} id={did}/>
				<Message show={mshow} handleClose={()=>setMshow(false)}/>
				{!props.isloading && <> 
					<Card title="Add Trasaction" subtitle="Add credit /debit">
						<ExpenseForm category={category} type={type} handlesubmit={handlesubmit}/>
					</Card>
					<Card title="Your Trasaction" subtitle="Transaction for this month">
						<p>Total Expense : {formater(Math.abs(expense))}</p>
						<p>Total Credit : {formater(Math.abs(credit))}</p>
						{data.length > 0 && <Tablefilter handlecat={handlecat} type={type} 
						setEntery={setEntery} groupby={groupby}
						data={page_array} 
						total={total} />}
						<ExpenseTable data={data} handledelete={handledel} handlesort={handlesort} handleedit={handleedit}/>
						{data.length > 0 && footerbar()}
					</Card>
					</>
				}
			</div>
		</div>
	</div>
	)
}
export default withLoader(Addexpense);