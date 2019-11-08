import React from "react";
import NavbarPage from "../../components/Header/header"
import FooterPage from "../../components/Footer/footer"
// import {Link} from 'react-router-dom'



class Profile extends React.Component {

    state = {
        getuserbyid: {},
        projects:[]
    }

    async componentDidMount() {

        try {
            const response = await fetch('http://localhost:5001/api/users/2');
            const result = await response.json();
            console.log(result)
            if (result.success) {
                
                const getuserbyid = result.result[0];
                this.setState({ getuserbyid })
            }
            else
                console.log(result.message)
        }
        catch (err) {
            console.log(err)
        }


        try {
            const response = await fetch('http://localhost:5001/api/projects/2');
            const result = await response.json();
            console.log(result)
            if (result.success) {
                
                const projects = result.result;
                this.setState({ projects })
            }
            else
                console.log(result.message)
        }
        catch (err) {
            console.log(err)
        }


    }

    render() {
        return (
            <div>
                <NavbarPage />
                <ul>
                    
                  <li> {this.state.getuserbyid.name} </li> 
                  <li>{this.state.getuserbyid.email}</li> 
                  <li> {this.state.getuserbyid.aboutme}</li> 
                  <li> {this.state.getuserbyid.experience}</li> 
                  <li> {this.state.getuserbyid.address}</li> 
                  <li> {this.state.getuserbyid.date}</li> 
                  <li><img src={`http://localhost:5001/images/${this.state.getuserbyid.image}`}/></li>
                    
                    </ul>
                    <ul>
                    {this.state.projects.map(i=>(
                            <li>{i.title}</li>
                    ))}
                    </ul>
                   
         

                <FooterPage />
            </div>
                    
        )
    }
}




export default Profile;