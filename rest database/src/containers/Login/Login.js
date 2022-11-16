import Signin from "./Signin";
import Signout from "./Signout";

const Login = (props) =>{
    return (
        <div>
            {props.userName === undefined? <Signin signIn= {props.signIn}/>: <Signout signOutUser={props.signOutUser} userName={props.userName}/>}
        </div>
    )

}
export default Login;