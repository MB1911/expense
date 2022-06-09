
import React from 'react';
import Card from '../ui/card';
import Filter from '../../components/filter';
import {getData} from '../context/utill';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar,Doughnut  } from 'react-chartjs-2';
import {useEffect,useState} from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const Graph = (props) =>{
const [data,setData] = useState({});
useEffect(async()=>{
setData(
  {
  labels: props.fdata.labels,
  datasets: [{
    label: 'Current Month',
    data: props.fdata.data,
       barThickness: 50,
       
    backgroundColor: [
     'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
 
}
  )
console.log(props.fdata.labels.length);
},[props])

const search = async(month) =>{
  const req = await getData({url:"/expense/expensebymonth",method:"POST",body:{month:month,year:new Date().getFullYear()}});
  console.log(req.labels);
  setData(
  {
  labels: req.labels,
  datasets: [{
    label: 'Current Month',
    data: req.data,
       barThickness: 60,
        
    backgroundColor: [
     'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
}
  )
}
return(
	<>
	<div className="col-12">
	<Card title="Expense Graph" subtitle="This Month">
	<Filter type="month" search={search}/> 
  {data && typeof data.labels === "undefined" || data.labels.length === 0 ? <p>No data to display</p> : <Bar data={data} />}

	</Card>
	</div>
	</>
)
}
export default Graph;