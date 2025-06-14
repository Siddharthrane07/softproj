import {Link,useNavigate} from "react-router-dom"
import './login.css';
import { useContext,useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";


const Login = () =>{
	const [inputs,setinputs] = useState({
		name:"",
		email:"",
		pswd:"",
	})
	
	// return res.data;
	const handleChange = (e) =>{
		setinputs((prev) =>({...prev,[e.target.name]:e.target.value})
		);
	  };
	
	const { login } = useContext(AuthContext);

  const navigate = useNavigate();
	const [err,setErr] = useState(null);

	const handleSignup  = async (e) =>{
		e.preventDefault();
		try{
    await axios.post("http://localhost:8800/api/auth/register",inputs,{
			withCredentials: true,
	})
		}
		catch(err){
			console.log(err);
		}
	}
	
	const handleLogin = async (e) =>{
		e.preventDefault();
		try{
		 const userData = {
        email: inputs.email,
        pswd: inputs.pswd, // Note: In production, hash password before sending
      };
			await login(userData);
			navigate("/dashboard");

		}
		catch(err){
			setErr(err.response.data)
		}
	}

	

return (
    <>
    <link rel="stylesheet" type="text/css" href="slide navbar style.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"/>
	<div class="body">
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="name" placeholder="User name" required=""onChange={handleChange}/>
					<input type="email" name="email" placeholder="Email" required=""onChange={handleChange}/>
					<input type="password" name="pswd" placeholder="Password" required=""onChange={handleChange}/>
					<button onClick={handleSignup}>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" onChange={handleChange}/>
					<input type="password" name="pswd" placeholder="Password" required="" onChange={handleChange}/>
					<button onClick={handleLogin}>Login</button>
				</form>
			</div>
	</div>
	</div>
    </>
);
}

export default Login;