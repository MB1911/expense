import ExpenseTable from './expensetable';
import WithData from './HOC/withdata';
import {useState,useEffect} from 'react';
import {getData,formatter,getfullmonth} from './context/utill';
import Card from './ui/card';
import withLoader,{formater} from './context/utill';
import Filter from './filter';
import {useUser} from './context/userinfo';
import Graph from './graph/graph';
import EditModal from './modal/editmodal';
import Deleteconfirm from './modal/deleteconfirm';

const Viewexpense = (props) =>{

//Method from context
const {handledelete} = useUser();	

//display all the transaction
const[data,setData]=useState([]);

//default month to current month
const[date,setDate]=useState(new Date().getMonth()+1);

//default year to current year
const[year,setYear]=useState(new Date().getFullYear());

//get month name from month
const[month,setMonth]=useState(getfullmonth(new Date().getMonth()));

//total expense
const[expense,setExpense]=useState(0);


//dispalay delete confirm modal
const[showdelete,setShowdelete]=useState(false);

//id to delete
const[deleteid,setDeleteid]=useState(0);

//display edit modal
const[editshow,setEditshow]=useState(false);

//edit data

const[editdata,setEditdata]=useState([]);
const[type,setType]=useState([]);
//to display all transaction and expense 
useEffect(async()=>{
setData(props.fdata);
let ammount = props.fdata.map(d=>d.ammount < 0 && d.ammount).reduce((a,b)=>a+b,0);
setExpense(ammount);
const cat = await getData({url:"/expense/view/type"});
setType(cat);


},[props])




//to display spinner at load time
const[summary,setSummary]=useState([]);
const[gdata,setGdata]=useState([]);
useEffect(async()=>{
const req = await getData({url:"/expense/group",method:"POST",body:{month:date,year:year}});	
setSummary(req);
const gdata = await getData({url:"/expense/expensebymonth",method:"POST",body:{month:date,year:year}});
setGdata(gdata);
setTimeout(()=>{
props.setIsloading(false);
},800)
},[month,year])

//Delete transaction
const deletemodal = async(id) =>{

	setShowdelete(true);
	setDeleteid(id);
	
}
const handleeditdata = async(id) =>{

	setEditshow(true);
	const demo = await getData({url:"/expense/by/id",method:"POST",body:{id:id}});
	setEditdata(demo);
}
const deleteexpense = async(data,id) =>{
	const res = await handledelete(data,id);
	setShowdelete(false);
	setData(res);

}

//Handle Month change
const handlechange = async(e) =>{

	setDate(e.target.value);
	let month = +e.target.value;
	const req = await getData({url:"/expense/alltransaction",method:"POST",body:{month:month,year:year}});
	setData(req);
	setMonth(e.target.options[e.target.selectedIndex].text);
	let expense = req.map(d=>d.ammount < 0 && d.ammount).reduce((a,b)=>a+b,0);
	setExpense(expense);
}	
const display = async() =>{
	const tra_data = await getData({url:"/expense/alltransaction",method:"POST",body:{month:new Date().getMonth()+1,year:new Date().getFullYear(),num:6}})
	setData(tra_data);
}
return(
	<section>
			{!props.isloading &&
				<>
					<EditModal show={editshow} handleClose={()=>setEditshow(false)} editdata={editdata} type={type} setdata={display}/>
					<Deleteconfirm show={showdelete} data={data} handleClose={()=>setShowdelete(false)} handledelete={deleteexpense} id={deleteid}/>
					<Card title="View Expense" subtitle="Month and year">
							<div className="row">
									<div className="col-md-4 col-sm-12">
											<label>Month</label>
											<select className="form-select" value={date} onChange={handlechange}>
												<option value="1">Jan</option>
												<option value="2">Feb</option>
												<option value="3">March</option>
												<option value="4">April</option>
												<option value="5">May</option>
												<option value="6">June</option>
												<option value="7">July</option>
												<option value="8">Augast</option>
												<option value="9">September</option>
												<option value="10">October</option>
												<option value="11">November</option>
												<option value="12">December</option>
											</select>
									</div>
									<div className="col-md-4 col-sm-12">
											<label>Year</label>
											<select className="form-select mb-5" value={year} onChange={handlechange}>
												<option value="2022">2022</option>
												<option value="2021">2021</option>
												<option value="2020">2020</option>
											</select>
									</div>
								</div>
								<div className="row">
								
								
								<div className="col-md-4 col-sm-12">
									<Card title="Summary of expense" subtitle="this month">
										<table className="table">
										<tbody>	
										{summary.map((d=><tr><td>{d.type}</td><td>{formater(d.total)}</td></tr>))}
										</tbody>	
										
										</table>
										<h6><div><b>Total Expense: {formater(expense)}</b></div></h6>
									</Card>
								</div>
								<div className="col-md-8 col-sm-12">
									
										<Graph fdata={gdata}/>
									
								</div>
							</div>	
							<div className="row">	

									<div className="col-12">
											<h5 className="card-title">Showing Result of {month}-{year}</h5>
											<ExpenseTable data={data} className="table" handledelete={deletemodal} handleedit={handleeditdata}/>
									</div>
							</div>
							
							
					</Card></>}
			</section>
	)
}
export default withLoader(WithData(Viewexpense,"/expense/alltransaction"));