import React from "react";

import "./Project_view.css"



class Project_view extends React.Component {

    state = {
        getprojectbyprojectid: []
    }

    async componentDidMount() {

        try {
            const response = await fetch(`http://localhost:5001/api/projects/projectid/${this.props.match.params.id}`);
            const result = await response.json();
            //  console.log(result)
            if (result.success) {

                const getprojectbyprojectid = result.result;
                console.log(getprojectbyprojectid)
                this.setState({ getprojectbyprojectid })
            }
            else
                console.log(result.result)
        }
        catch (err) {
            console.log(err)
        }

    }


    render() {
        return (
            <div className= 'projectview'>
                {this.state.getprojectbyprojectid.map(i => (




                    <img src={`http://localhost:5001/images/${i.image}`}   alt= "" />





                ))}

            </div>
        )
    }
}



export default Project_view;