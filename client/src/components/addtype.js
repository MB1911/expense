import Card from './card';
import {useRef,useEffect,useState} from 'react';
import {getData} from './utill';
import WithLoader from './utill';
const Addtype = (props) =>{

const type= useRef();
const[data,setData]=useState([]);
const[error,setError]=useState(false);
const{isloading,setIsloading}=props;
const handlesubmit = async(e) =>{


	e.preventDefault();
	if(type.current.value)
	{
		const req = await fetch("/expense/add/type",{
		method:"POST",
		headers: { 'Content-Type': 'application/json' },
		body:JSON.stringify({name:type.current.value})
	});
	const res = await req.text();
	if(req.ok)
	{
		const fdata =await getData({url:"/expense/view/type"});
		setData(fdata);
	}	
	}
	else
	{
		setError(true);
	}
	
}
useEffect(async()=>{
const fdata =await getData({url:"expense/view/type"});
setData(fdata);
setTimeout(()=>{
setIsloading(false);
},500)
},[])	
return(
	<>
	{!isloading &&	
<div className="col-md-6 offset-md-3 pt-5">
	<Card title="Add Credit/Debit Type" subtitle="i.e Glosary,Phonebill">
		<form onSubmit={handlesubmit}>
			<div className="row">
				<div className="col-6">
				<input type="text" className="form-control" placeholder="Add type" ref={type} className={`form-control ${error ? "is-invalid" :"isvalid"}`}/>
				<div className="invalid-feedback">Enter Value for type</div>
				</div>
				<div className="col-6">
				<button className="btn btn-primary " type="submit">Add</button>
				</div>
			</div>
		</form>
	</Card>
	<Card title="Avaiable credit/debit type" subtitle="created">
		<ul class="list-group list-group-flush">
			{data.map(d=> <li class="list-group-item">{d.category}</li>)}
        </ul>
	</Card>
</div>
}
</>
	)
}
export default WithLoader(Addtype);