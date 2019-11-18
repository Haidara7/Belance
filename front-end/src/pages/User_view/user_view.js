import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom'


import "./user_view.css"



class User_view extends React.Component {

    state = {
        projects: [],
        getuserbyid: []
    }

    async componentDidMount() {

        try {
            const response = await fetch(`http://localhost:5001/api/users/${this.props.match.params.id}`);
            const result = await response.json();
            console.log(result)
            if (result.success) {

                const getuserbyid = result.result[0];
                this.setState({ getuserbyid }, () => console.log('====', this.state.getuserbyid))
            }
            else
                console.log(result.message)


        }
        catch (err) {
            console.log(err)
        }



        try {
            const response = await fetch(`http://localhost:5001/api/projects/${this.props.match.params.id}`);
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
        console.log(this.props)
        return (
            <div className="container">


                <div class="text-center1">

                    <Card >
                        <CardImg top width="35%" src={`http://localhost:5001/images/${this.state.getuserbyid.image}`} style={{ width: '180px', height: '180px' }} alt="" />
                        <CardBody style={{textAlign:"center"}}>
                            <h3><CardTitle>{this.state.getuserbyid.name}</CardTitle></h3>
                            <CardText>{this.state.getuserbyid.email}</CardText>
                            <CardText>{this.state.getuserbyid.experience}</CardText>
                            <CardText>{this.state.getuserbyid.aboutme}</CardText>
                            <CardText>{this.state.getuserbyid.address}</CardText>
                            <h5>Member since  {this.state.getuserbyid.date}</h5>
                            {/* <a href={`/editor`}> */}
                            {/* {
                                this.props.location.state.isTheUser ? <div><Button className="btn btn-dark"  >Follow</Button>
                                    <Button className="btn btn-dark">Message</Button></div> : null
                            } */}
                            {/* </a> */}
                        </CardBody>
                    </Card>
                </div>

                <div className="prouser">
                    {this.state.projects.map(i => (
                        <>
                            <Link to={`/Project-view/${i.project_id}`} ><h2 style={{ marginTop: 66 }}>{i.title}</h2></Link>
                            {i.date}

                            <AwesomeSlider cssModule={AwesomeSliderStyles} >

                                {i.images.map(image => (
                                    <div data-src={`http://localhost:5001/images/${image.image_name}`} />

                                ))}
                            </AwesomeSlider>
                        </>
                    ))}
                </div>
            </div>





        )
    }
}



export default User_view;