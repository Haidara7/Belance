import React from "react";
// import NavbarPage from "../../components/Header/header"
// import FooterPage from "../../components/Footer/footer"
import "./login.css"







class Login extends React.Component {

    render() {
        return (
            <div className="sign">
            <form className="text-center border border-light p-5" action="#!">
                <p className="h4 mb-4">Sign in</p>
                {/* Email */}
                <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />
                {/* Password */}
                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />
                <div className="d-flex justify-content-around">
                </div>
                <button className="btn btn-dark btn-block my-4 login" type="submit">Sign in</button>
               
            </form>

           </div>
        )
    }
}




export default Login;