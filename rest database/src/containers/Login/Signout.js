import classes from "./Login.module.css";

const Signout = (props) => {

    function logout() {
        props.signOutUser()
    }
    
    return (
        <div>
            <button className = {classes.button}onClick={logout}>
            Log Out as {props.userName}
            </button>
        </div>
    )
}

export default Signout;