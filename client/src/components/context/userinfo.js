import React, {useState,useEffect,useContext} from 'react';
import {getData} from './utill';
const Userinfo = React.createContext({
islogin:false
})
export const useUser = () =>{
	return useContext(Userinfo);
}
export const Userprovider = (props) =>{
const[islogin,setIslogin]=useState(false);
const checklogin = () =>{

	
		setIslogin(true);
		localStorage.setItem("username","demo");
		
	
	
}
const handledelete = async(data,id) =>{

	const req = await getData({url:"/expense/delete",method:"POST",body:{id:id}});
	const reduce_amt = data.filter(d=>d._id == id); 
	const newdata = data.filter(d=>d._id !== id);
	console.log(newdata);
	return newdata;
}
const handleedit = async(data,id) =>{
	
}
return <Userinfo.Provider value={{
islogin,
checklogin,
handledelete,
}}>{props.children}</Userinfo.Provider>
}

export default Userinfo;