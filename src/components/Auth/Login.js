import React from "react";
import propTypes from "prop-types";

const Login = (props) => {
    return(
        <div className="login-container">
            <nav className="login">
                <h2>Authorization</h2>
                <p>Enter your GitHub Login and Password</p>
                <button onClick={() => props.authenticate()} className="github">Log In</button>
            </nav>
        </div>
    )
};

Login.propTypes = {
    authenticate: propTypes.func.isRequired  
};

export default Login;