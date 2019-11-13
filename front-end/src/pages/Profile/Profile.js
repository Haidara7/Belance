import React from "react";
import Projects from "../../components/projects/projects"
import Users from "../../components/users/users"
// import Test from "../../components/test"
// import AwesomeSlider from 'react-awesome-slider';
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
// import NavbarPage from "../../components/Header/header";
import './Profile.css';
// import FooterPage from "../../components/Footer/footer";
// import {Link} from 'react-router-dom'




class Profile extends React.Component {


    render() {
        return (
            <div className = "container">
                {/* <div className="test">
                    <Test user_id={2}/>
                </div> */}
                <div className="users">
                    <Users user_id={this.props.user_id}/>
                </div>
                <div className="projects">
                    <Projects  user_id={this.props.user_id}/>
                </div>

                
            </div>

        )
    }
}




export default Profile;