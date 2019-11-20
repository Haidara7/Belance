import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import "./projects.css"
import {Link} from 'react-router-dom'





class Projects extends React.Component {

    state = {

        projects: []

    }

    async componentDidMount() {

        try {
            const response = await fetch(`http://localhost:5001/api/projects/${this.props.user_id}`);
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
            <div className = "ff">
                {this.state.projects.map(i => (
                    <>
           <Link to={`/Project-view/${i.project_id}`} ><h2 style={{ marginTop: 66 }}>{i.title}</h2></Link>
                        {i.date}

                        <AwesomeSlider cssModule={AwesomeSliderStyles} >

                            {i.images.map(image => (
                                <div  data-src={`http://localhost:5001/images/${image.image_name}`} />

                            ))}


                        </AwesomeSlider>

                    </>
                ))}

            </div>


        )
    }
}


export default Projects;