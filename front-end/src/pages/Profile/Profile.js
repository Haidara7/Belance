import React from "react";
import Projects from "../../components/projects/projects"
import Users from "../../components/users/users"
// import AwesomeSlider from 'react-awesome-slider';
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
// import NavbarPage from "../../components/Header/header";
// import './Profile.css';
// import FooterPage from "../../components/Footer/footer";
// import {Link} from 'react-router-dom'




class Profile extends React.Component {


    render() {
        return (
            <div>
                <Users />
               <Projects />
            </div>
            

        )
    }
}




export default Profile;