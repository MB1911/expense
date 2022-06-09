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
	{data.length == 0 ? <p>No data to display</p> :
	<table className="table table-borderless">
		<thead>
		<tr>
			<th>Type</th>
			<th>Ammount</th>
		</tr>
		</thead>
		<tbody>
			{data &&  data.map(d=><tr><td>{d.type}</td><td>{formater(d.total)}</td></tr>)}

		</tbody>
	</table>}
	
</Card>
	)
}
export default Viewtransaction;