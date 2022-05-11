import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useState,useEffect} from 'react';
import {getData,date_formatter,date_seter,formater,sort} from '../context/utill';
const Editmodal = (props) =>{


	const[data,setData]=useState([]);
	const[date,setDate]=useState(props.editdata.date);
	useEffect(()=>{
		setData([{type:props.editdata.type,ammount:props.editdata.ammount,date:props.editdata.date}]);
		setDate(props.editdata.date);
		console.log(props.type)
	},[props])
	
	const handlesubmit = async(e) =>{

		console.log(data,props.editdata);
		e.preventDefault();
		const req = await getData({url:"/expense/edit",method:"POST",body:{id:props.editdata._id,type:data[0].type,ammount:data[0].ammount,date:data[0].date}});
		props.setdata();
		props.handleClose();	
		console.log(req);
	}
	const handlechange = (e) =>{


		const newdata =[...data];
		if(e.target.name=="type")
		{
			newdata[0].type=e.target.value;
			newdata[0].ammount=props.editdata.ammount;
			newdata[0].date=props.editdata.date;
		}
		if(e.target.name=="ammount")
		{
			newdata[0].ammount=e.target.value;
			newdata[0].type=props.editdata.type;
			newdata[0].date=props.editdata.date;
		}

		if(e.target.name=="date")
		{
			newdata[0].date=e.target.value;
			newdata[0].type=props.editdata.type;
			newdata[0].ammount=props.editdata.ammount;	
		}
		setData(newdata);
	}
return(
	<Modal show={props.show} onHide={props.handleClose}  style={{"paddingTop":"150px"}} dialogClassName="modal-dialog modal-md">

		
		<Modal.Header closeButton>
    <Modal.Title>Edit Expense</Modal.Title>
  </Modal.Header>
        <Modal.Body className="text-dark">
        <form onSubmit={handlesubmit}>
                  <div className="form-group">
                  	<label>Type</label>
                  	<input list="name" name="type" className="form-control" value={data[0] && data[0].type} onChange={handlechange}/>
					<datalist  id="name">
						{props.type.length > 0 && props.type.map(d=><option value={d.type} id={d._id}>{d.type}</option>)}
					</datalist>
                  	
                  	<div className="invalid-feedback"></div>
                  </div>          
                  <div className="form-group">
                  	<label>Ammount</label>
                  	<input type="number" value={data[0] && data[0].ammount} className="form-control" name="ammount" onChange={handlechange}/>
                  </div>          

                  <div className="form-group">
                  	<label>Date</label>
                  	<input type="date" value={date && date.toString().split("T")[0] } className="form-control" name="date" onChange={handlechange}/>
                  </div>          
                  <button type="submit" className="btn btn-success my-3 ml-5">Update</button>
                  <button type="button" className="btn btn-secondary" style={{"marginLeft":"10px"}} onClick={()=>props.handleClose()}>Cancel</button>
          </form>
        </Modal.Body>
        
    </Modal>
	)
}
export default Editmodal;