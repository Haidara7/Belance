import React from "react";
// import NavbarPage from "../../components/Header/header"
// import FooterPage from "../../components/Footer/footer"
import "./login.css"







class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        email: '',
        password: ''


        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onLoginFormSubmit = async event => {
        event.preventDefault();
        try {

            const body = {
                email: this.state.email,
                password: this.state.password
            }
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(body)
            })
            const data = await response.json();
            this.props.setUser({
                token: data.token,
                user_id: data.user.user_id,
                user: data.user
            })
            this.props.history.push('/')


            
        }catch (err){
            alert(err.message)
        }
    }



    render() {
        return (
            <div className="sign">
                <form className="text-center border border-light p-5" action="" onSubmit={this.onLoginFormSubmit}>
                    <p className="h4 mb-4">Sign in</p>
                    {/* Email */}
                    <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" name='email' onChange={this.handleChange} />
                    {/* Password */}
                    <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password"  name='password' onChange={this.handleChange} />
                    <div className="d-flex justify-content-around"/>
                
                    <button className="btn btn-dark btn-block my-4 login" type="submit">Sign in</button>
                
                </form>

           </div>
        )
    }
}




export default Login;