import {useLocation,NavLink} from 'react-router-dom';
import {useUser} from '../context/userinfo';
const NotFound = () =>{

let location = useLocation();	
const {islogin,checklogin} = useUser();
const path = islogin ? "/dashboard" : "/";

  return (
    <section>
      <div class="container">
      <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <h2>No match for <code>{location.pathname}</code></h2>
        <NavLink className="btn" to={path}>Back to home</NavLink>
      </section>
    </div>
    </section>
	)
}
export default NotFound;