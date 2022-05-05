import Card from './ui/card';
import Expensetable from './expensetable';
import {useEffect,useState,useRef} from 'react';
import {getData,formater,getfullmonth} from './context/utill';
const Search = () =>{

const month_ref = useRef();
const cat_sel_ref = useRef();
const[cat,setCat]=useState([]);
const[data,setData]=useState([]);
const[month,setMonth]=useState(new Date().getMonth()+1);
const[year,setYear]=useState();
const[ammount,setAmmount]=useState(0);
const[selectedcat,setSelectedcat]=useState("all");
const[fdata,setFdata]=useState([]);
useEffect(async()=>{
	const data = await getData({url:"/expense/group",method:"POST",body:{month:month,year:new Date().getFullYear()}});
	// setData(data);
},[month])	



const handlesearchby = async(e) =>{
if(e.target.value=="1")
{
	const cat = await getData({url:"/expense/view/type"});
	setCat(cat);
	setAmmount(0);
}
else
{

	setAmmount(e.target.value);
}
}
const handlesearch = async() =>{


	
	
	const myar = [...data];
	if(cat_sel_ref.current.value=="all")
	{
		setMonth(month_ref.current.value);
		const data = await getData({url:"/expense/group",method:"POST",body:{month:month_ref.current.value,year:new Date().getFullYear()}});
		setFdata(data);
		// console.log("all");
	}
	else
	{
		const singledata = await getData({method:"post",url:"/expense/group/cat",body:{month:month_ref.current.value,year:"2022",cat:cat_sel_ref.current.value}});
		setFdata(singledata);
		console.log(singledata);	
	}
	let up_limit;
	let low_limit;
	alert(cat_sel_ref.current.value);
	if(cat_sel_ref.current.value == "1-100")
	{

		up_limit = 100;
		low_limit = 1;
		const singl_amnt_data = await getData({method:"post",url:"/expense/group/ammount",body:{month:month_ref.current.value,year:"2022",cat:cat_sel_ref.current.value,up_limit:up_limit,low_limit:low_limit}});
		console.log(singl_amnt_data);
		setFdata(singl_amnt_data);
	}
	if(cat_sel_ref.current.value=="100-1000")
	{
		up_limit = 1000;
		low_limit = 100;
		const singl_amnt_data = await getData({method:"post",url:"/expense/group/ammount",body:{month:month_ref.current.value,year:"2022",cat:cat_sel_ref.current.value,up_limit:up_limit,low_limit:low_limit}});
		console.log(singl_amnt_data);
		setFdata(singl_amnt_data);	
	}
	if(cat_sel_ref.current.value=="1000-5000")
	{
		up_limit = 5000;
		low_limit = 1000;
		const singl_amnt_data = await getData({method:"post",url:"/expense/group/ammount",body:{month:month_ref.current.value,year:"2022",cat:cat_sel_ref.current.value,up_limit:up_limit,low_limit:low_limit}});
		console.log(singl_amnt_data);
		setFdata(singl_amnt_data);	
	}
	if(cat_sel_ref.current.value=="more than 5000")
	{
		up_limit = 100000;
		low_limit = 5000;
		const singl_amnt_data = await getData({method:"post",url:"/expense/group/ammount",body:{month:month_ref.current.value,year:"2022",cat:cat_sel_ref.current.value,up_limit:up_limit,low_limit:low_limit}});
		console.log(singl_amnt_data);
		setFdata(singl_amnt_data);	
	}


	
	
}
 const far = fdata.length ? fdata : data
return(
	<Card title="Search" subtitle="by categoty and ammount">
		<div className="container">
			<div className="row">
				<div className="col-md-2">
					<div className="form-group">
						<label>Search By</label>
						<select className="form-select" onChange={handlesearchby} >
							<option value="0">Select option</option>
							<option value="1">Category</option>
							<option value="2">Ammount</option>
						</select>
					</div>
				</div>


				<div className="col-md-2">
					<div className="form-group">
						{cat.length > 0 ? <label>Category</label> : <label>Ammount</label>}
						
						<select className="form-select" ref={cat_sel_ref} >
							
							{ammount == "0" && 
							 cat.map(c=><option value={c.type}>{c.type}</option>
							)}
							{ammount == "0" && <option value="all">All</option>}
							{ammount == "2" &&
							<>
							<option value="1-100">between 1 to 100</option>
							<option value="100-1000">between 100 to 1000</option>
							<option value="1000-5000">between 1000 to 5000</option>
							<option value="more than 5000">more than 5000</option>
							</>
						}
						</select>
						
						
					</div>
				</div>

				<div className="col-md-2">
					<div className="form-group">
						<label>Month</label>
						<select className="form-select" ref={month_ref} >
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
				</div>

				<div className="col-md-2">
					<div className="form-group">
						<label>Year</label>
						<select className="form-select" onChange={(e)=>setYear(e.target.value)} value={year}>
							<option value="2022">2022</option>
							<option value="2021">2021</option>
						</select>
					</div>
				</div>

				<div className="col-md-2 mt-3">
					<button className="btn btn-success" onClick={handlesearch}>Search</button>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<h5 className="card-title">Search result</h5>
					{far && far.map(d=><>
				<li className="list-group-item" style={{display:"flex","border":"none","fontWeight":"bold"}}>
					<div className="col-md-3">
						{d.type}
					</div>
					<div className="col-md-4 offset-md-2" >{formater(d.total)}</div>
				</li>
				</>)

				}
				{!far.length && <p>No search result</p>}
				</div>
			</div>

		</div>
	</Card>

	)
}
export default Search;