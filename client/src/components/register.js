import {Link,useNavigate,NavLink} from 'react-router-dom';
import {useRef,useState} from 'react';
import {getData} from './context/utill';
const Register = () =>{

const username_ref = useRef();
const password_ref = useRef();
const[isusernamevalid,setUsernameIsvalid]=useState(true);
const[ispasswordvalid,setPasswordIsvalid]=useState(true);
const[message,setMessage]=useState("");
const handleregister = async(e) =>{


e.preventDefault();
if(username_ref.current.value=="")
{
    setUsernameIsvalid(false);
}
if(password_ref.current.value=="")
{
    setPasswordIsvalid(false);
}
if(username_ref.current.value=="" && password_ref.current.value=="")
{
    setUsernameIsvalid(false);
    setPasswordIsvalid(false);
}
if(username_ref.current.value != "" && password_ref.current.value !="")
{
	const adduser = await getData({url:"/expense/register",method:"POST",body:{username:username_ref.current.value,password:password_ref.current.value}});
	setMessage(adduser);	
}

}

return(
	<div class="container">
     <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
	 <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-center py-4">
              </div>
	<div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Register here</h5>
                    <p class="text-center small">Enter your username & password to Signup</p>
                    {message && <div className="bg-secondary p-2 text-white" style={{display:"flex",lineHeight:"1.2"}}><h1 style={{marginRight:"50px"}}><i className="bi bi-info-circle-fill "></i></h1><h6 className="pr-2 pt-3">{message}</h6></div>}
                  </div>
	  <form class="row g-3 needs-validation"  onSubmit={handleregister} novalidate>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Username</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" 
                        name="username" 
                        className={`form-control ${!isusernamevalid ? "is-invalid" : ""}`} 
                        id="yourUsername" 
                        ref={username_ref}
                        />
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>


                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Password</label>
                      <div class="input-group has-validation">
                        
                        <input type="password" 
                        name="password" 
                        class="form-control" 
                        id="yourpassword" 
                        ref={password_ref}
                        className={`form-control ${!ispasswordvalid ? "is-invalid" : ""}`} 
                        />
                        <div class="invalid-feedback">Please enter your password.</div>
                      </div>
                    </div>


                   

                     <div class="col-12">
                      <button class="btn btn-success w-100 mb-3" type="submit">Signup</button>
                    </div>

                    <div class="col-12">
                      <p class="small mb-0">Already have account? <NavLink to="/">Login</NavLink></p>
                    </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>    
	)
}
export default Register;