import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';




class Projects extends React.Component {

    state = {

        projects: []

    }

    async componentDidMount() {

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
                {this.state.projects.map(i => (
                    <>
                        <AwesomeSlider cssModule={AwesomeSliderStyles} style={{ width: '400px', height: '200' }}>

                            {i.images.map(image => (
                                <div data-src={`http://localhost:5001/images/${image.image_name}`} />

                            ))}

                        </AwesomeSlider>
                    </>
                ))}

            </div>


        )
    }
}


export default Projects;