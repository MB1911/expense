import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useUser} from '../context/userinfo';
const Deleteconfirm = (props) =>{	

return(
<Modal show={props.show} onHide={props.handleClose}  style={{"paddingTop":"150px"}} dialogClassName="modal-dialog modal-sm">
                
        <Modal.Body className="text-center text-dark" >
        	<h1><i class="bi bi-exclamation-triangle text-danger"></i></h1>
        	<h4>Confirm</h4>
        	<p className="px-0" style={{"width":"","margin":"0 auto"}}>Are you sure want to delete <b>Record:{props.id}</b>  reacord???</p>
        </Modal.Body>
        <Modal.Footer className="text-center  " style={{"paddingRight":"70px"}}>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{props.handledelete(props.data,props.id)}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
	)
}
export default Deleteconfirm;