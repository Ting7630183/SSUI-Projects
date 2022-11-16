import logo from "../../assets/images/google-logo.png";
import classes from "./Login.module.css";

const Signin = (props) => {
    function login() {
        props.signIn()
    }

    return (
        <div>
            <button className={classes.bigDiv} onClick={login}>
            <img src={logo} width="13px" className = {classes.image}/>
            Log In with Google
            </button>
        </div>
    )
}

export default Signin;

