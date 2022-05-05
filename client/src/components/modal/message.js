import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Message = (props) =>{
return(	
<Modal show={props.show} onHide={props.handleClose}  style={{"paddingTop":"150px"}} dialogClassName="modal-dialog modal-sm"> 
        <Modal.Body className="text-center text-dark" >
        	<h1><i class="bi bi-check-circle-fill text-success"></i></h1>
        	<h4>Success</h4>
        	<p className="px-0" style={{"width":"","margin":"0 auto"}}>
        		Transaction added successfully!!
        	</p>
        </Modal.Body>
        <Modal.Footer className="text-center" style={{"width":"","margin":"0 auto"}}>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
      </Modal>
	)
}
export default Message;