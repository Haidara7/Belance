import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import "./projects.css"




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
            <div>
                {this.state.projects.map(i => (
                    <>
                        <h3 style={{marginTop:20}}>{i.title}</h3>
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