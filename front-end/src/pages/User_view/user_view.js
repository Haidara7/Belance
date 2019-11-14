import React from "react";



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

                const getuserbyid = result.result;
                this.setState({ getuserbyid })
            }
            else
                console.log(result.message)


            }
            catch (err) {
                console.log(err)
            }



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

                {/* {this.state.getprojectbyprojectid.map(i => (




                    <img src={`http://localhost:5001/images/${i.image}`} alt="" />





                ))} */}

            </div>
        )
    }
}



export default User_view;