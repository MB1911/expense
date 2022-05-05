import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useRef} from 'react';
const Report = (props) =>{

const month = useRef();	
const year = useRef();

const handlereport = async() =>{
	let month_value = month.current.value;
	let year_value = year.current.value;

	const req= await fetch("/expense/report",
		{
			method:"POST",
			body:JSON.stringify({month:month_value,year:year_value}),
			 headers: {'Content-Type': 'application/json'}
   		})
	
    const downloadUrl = URL.createObjectURL(await req.blob());
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "file.xlsx";
    a.click();
}
return(
	<Modal show={props.show} onHide={props.handleClose}  style={{"paddingTop":"150px"}} dialogClassName="modal-dialog modal-sm"> 
		<Modal.Header closeButton>
          <Modal.Title>Select Month,Year</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center text-dark" >
        	<div className="container">
        		<div className="row">
        			
        			
        			<div className="col-md-12">

        				<select className="form-select mb-3" ref={month}>
        					<option value="0">Select Month</option>
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
        			<div className="col-md-12">
        			<select className="form-select" ref={year}>
        			<option value="0">Select Year</option>
        			<option value="2020">2020</option>
        			<option value="2021">2021</option>
        			<option value="2022">2022</option>
        			</select>
        			</div>

        			<div className="col-md-12">
        				<div class="d-grid gap-2">
        				<button type="button" onClick={handlereport} className="btn btn-success mt-3 pr-5">Genrate Report</button>
        				</div>
        			</div>

        		</div>
        	</div>
        </Modal.Body>
        	
      </Modal>
	)
}
export default Report;