import {getData,date_formatter,date_seter,formater} from './context/utill';
import {NavLink} from 'react-router-dom';
import {useRef,useState} from 'react';
const ExpenseForm = ({handlesubmit,type}) =>{
const category = useRef();
const ammount = useRef();
const today = date_seter();
const[date,setDate]=useState(today);
const[isvalid,setIsvalid]=useState(true);
const addexpense = (e) =>{

	e.preventDefault();
	if(category.current.value=="0" || !ammount.current.value)
	{
		setIsvalid(false);
	}
	else
	{
		handlesubmit(e,category.current.value,ammount.current.value,date);	
		category.current.value = "";
		ammount.current.value = "";
		setDate(today);	
	}
	
	
}	
return(	
<form onSubmit={addexpense}>
		<div className="row">
		<div className="col-3">
		<div className="form-group">
			<label>Credit/debit type</label>
			<input list="name" className="form-control" ref={category} className={`form-control ${!isvalid ? "is-invalid" : ""}`}/>
			<datalist  id="name">
				{type.map(d=><option value={d.type} id={d._id}>{d.type}</option>)}		
			</datalist>
			<div className="invalid-feedback">Enter Expense type</div>
			<span>i.e Salary for credit,glosary for expense</span>			
		</div>
		</div>
		<div className="col-3">
		<div className="form-group">
			<label>Ammount</label>
			<input type="number" className={`form-control ${!isvalid ? "is-invalid" : ""}`} ref={ammount}/>
			<div className="invalid-feedback">Enter Ammount</div>
			<span> + ammount for credit - for expense</span>
		</div>
		</div>
		<div className="col-3">
		<div className="form-group">
			<label>Ammount</label>
			<input type="date" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)} />
			<span>default Today's date</span>
		</div>
		</div>
		<div className="col-3">
		<div className="form-group">
			<button type="submit" className="btn btn-primary mt-3">Add</button>
		</div>
		</div>
		</div>
	</form>)
}
export default ExpenseForm;