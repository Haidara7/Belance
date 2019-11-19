import React from "react";
import './users.css'


import {
    Card, CardImg, CardText, CardBody,
    CardTitle,  Button
} from 'reactstrap';





class Users extends React.Component {


    state = {
        getuserbyid: {}
    }

    async componentDidMount() {

        try {
            const response = await fetch('http://localhost:5001/api/users/3');
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

    }

    render() {
        return (
            // <div>
            //     <ul>
            //         <img src={`http://localhost:5001/images/${this.state.getuserbyid.image}`} style={{ width: '200px', height: '200' }} alt = ""/>

            //         <h2>{this.state.getuserbyid.name} </h2>
            //         <h5>{this.state.getuserbyid.email}</h5>
            //          <h5>  {this.state.getuserbyid.aboutme}</h5> 
            //         <h5> {this.state.getuserbyid.experience}</h5>
            //         <h5> {this.state.getuserbyid.address}</h5>
            //         <h5> {this.state.getuserbyid.date}</h5>

            //     </ul>


            // </div>





            <div class="text-center">

                <Card >
                    <CardImg top width="35%" src={`http://localhost:5001/images/${this.state.getuserbyid.image}`} style={{ width: '180px', height: '180px' }} alt="" />
                    <CardBody>
                        <h3><CardTitle>{this.state.getuserbyid.name}</CardTitle></h3>
                        <CardText>{this.state.getuserbyid.email}</CardText>
                        <CardText>{this.state.getuserbyid.experience}</CardText>
                        <CardText>{this.state.getuserbyid.aboutme}</CardText>
                        <CardText>{this.state.getuserbyid.address}</CardText>
                        <h5>Member since  {this.state.getuserbyid.date}</h5>
                        <a href ={`/editor`}>
                        <Button className="btn btn-dark">Edit Profile</Button>
                        </a>
                    </CardBody>
                </Card>
            </div>

        )

    }
}









export default Users;