import React from 'react';
import Card from '../ui/card';
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
const Pie = (props) =>{
const[pdata,setPdata]=useState();
useEffect(async()=>{

const req1 = await fetch("/expense/sortbymonth");
const res1 = await req1.json();	

setPdata(
	{
  labels: res1.labels,
  datasets: [{
    label: 'Current Month',
    data: res1.data,
       barThickness: 60,
       	
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
 
    ],
     options : {
  maintainAspectRatio : false
},
radius: ['70%', '70%'],
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
},[])
return(
<Card title="Expense Graph" subtitle="This Year">
			
		{pdata && <Doughnut data={pdata} />}
		
	</Card>
	)
}
export default Pie;