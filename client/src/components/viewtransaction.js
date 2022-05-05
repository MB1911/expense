//Summary of trnsaction on dashboard
import {useEffect,useState} from 'react';
import Card from './ui/card';
import {formater,getData} from './context/utill';
import WithLoad from './context/utill';
import Filter from './filter';
const Viewtransaction = (props) =>{

//with HOC withdata geting props.fata	
const{fdata}=props;
const[data,setData]=useState([]);
useEffect(()=>{
console.log(fdata);
setData(fdata);
},[props])

//filter for month,year
const search = async(value) =>{
	const data = await getData({url:"/expense/group",method:"POST",body:{month:value,year:new Date().getFullYear()}});
	setData(data);
}
return(
<Card title="Summary of transaction" subtitle="This Month">
	<Filter type="month" search={search}/>
	<ul className="list-group" style={{"marginLeft":"10px"}}>
		<div className="row">
			{data &&  data.map(d=><>
				<li className="list-group-item" style={{display:"flex","border":"none"}}>
					<div className="col-md-3">
						{d.type}
					</div>
					<div className="col-md-4 offset-md-2" >{formater(d.total)}</div>
				</li>
				</>)}
			{data.length == 0 && <p className="text-muted">No record to display</p>}
		</div>
	</ul>
</Card>
	)
}
export default Viewtransaction;