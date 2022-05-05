import {useState,useRef,useEffect} from 'react';
import {Link,useNavigate,NavLink} from 'react-router-dom';
import {useUser} from './context/userinfo';
const Login = () =>{

const username =useRef();
const password = useRef();
const hist = useNavigate();
const[isusernamevalid,setUsernameIsvalid]=useState(true);
const[ispasswordvalid,setPasswordIsvalid]=useState(true);
const {islogin,checklogin} = useUser();
const handlelogin = async(e) =>{
  e.preventDefault();

  if(username.current.value=="")
  {
    setUsernameIsvalid(false);
  }
  if(password.current.value=="")
  {
    setPasswordIsvalid(false);
  }
  if(username.current.value=="" && password.current.value=="")
  {
    setUsernameIsvalid(false);
    setPasswordIsvalid(false);
  }
  const req = await fetch("/expense/auth/local",{
    method:"POST",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({username:username.current.value,password:password.current.value})
  });
  const res = await req.text();
  if(res=="ok")
  {
    checklogin();
    hist("/dashboard");
  }
}
const handleglogin = (e) =>{

  e.preventDefault();
  checklogin();
  console.log(islogin);
  window.location.href="http://localhost:5000/auth/google";
}





return(
	<div class="container">
     <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
	 <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                
              </div>
	<div className="card mb-3">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center small">Enter your username & password to login</p>
                  </div>
	  <form className="row g-3 needs-validation" onSubmit={handlelogin} >

                    <div className="col-12">
                      <label  className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" 
                        name="username" 
                        className={`form-control ${!isusernamevalid ? "is-invalid" : ""}`}
                        id="yourUsername" 
                        ref={username}
                         
                        />
                        <div className="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label  className="form-label">Password</label>
                      <input type="password" name="passwword" className="form-control" id="yourPassword"  
                      ref={password}
                      className={`form-control ${!ispasswordvalid ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">Please enter your password!</div>
                    </div>

                                        <div className="col-12">
                      <button className="btn btn-primary w-100 mb-3" type="submit">Login</button>
                      <a className="btn btn-danger w-100 p-2" onClick={handleglogin}><i class="bi bi-google"></i>
                      <span className="p-5">Sign in With Google</span></a>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Don't have account? <NavLink to="/register">Create an account</NavLink></p>
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
export default Login;