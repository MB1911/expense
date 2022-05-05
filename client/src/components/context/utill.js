import React, {Component} from 'react';
import { useEffect, useState } from "react";
export const getData = async(config) =>{


const req = await fetch(config.url,{
	method:config.method ? config.method : "GET",
	body:config.body ? JSON.stringify(config.body) : null,
	headers: { 'Content-Type': 'application/json' },
});
const isJson = req.headers.get('content-type')?.includes('application/json');
const res = isJson ? await req.json() : await req.text();
console.log(res);
return res;
}

export const getfullmonth = (month) =>{
let arr = ["January","February","March","April","May","June","July","Augast","September","October","November","December"];
return arr[month];
}
export const sort = (data,field,order) =>{

if(order=="asc")
  {
    data.sort(function(a,b){
    if(Math.abs(a[field]) > Math.abs(b[field])){

      return 1;
    }
    if(Math.abs(a[field]) < Math.abs(b[field])){
      return -1;
    }
    })  
  }
  if(order=="dsc")
  {
    data.sort(function(a,b){
    if(Math.abs(a[field]) > Math.abs(b[field])){

      return -1;
    }
    if(Math.abs(a[field]) < Math.abs(b[field])){
      return 1;
    }
    })  
  }


  return {sdata:data};
}

export const date_formatter = (args) =>{

  return args.split("T")[0];

}

export const date_seter = () =>{
   var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

return today = yyyy + '-' + mm + '-' + dd
}




export const formater = (num) =>{
  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
});

return formatter.format(Math.abs(num)); 
} 	

  
function withLoader(WrappedComponent) {
    const Withload = (props) => {
      const [isloading, setIsloading] = useState(true);
        
      const changeload = status =>{
        setIsloading(status);
      }
      return (
        <>
        {isloading && <div class="spinner-border" role="status" style={{ "position":"fixed", "top": "50%","left": "50%","width":"2rem"}}>
                <span class="visually-hidden">Loading...</span>
              </div>}
        <WrappedComponent
        isloading={isloading}
        {...props}  
        setIsloading={changeload} 
        />
        </>
      );
    };
  
    return Withload;
  }
  
  export default withLoader;