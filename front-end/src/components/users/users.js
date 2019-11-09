import React from "react";




class Users extends React.Component {


    state = {
        getuserbyid: {}
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

    }

    render() {
        return (
            <div>
                <ul>

                    <li> {this.state.getuserbyid.name} </li>
                    <li>{this.state.getuserbyid.email}</li>
                    <li> {this.state.getuserbyid.aboutme}</li>
                    <li> {this.state.getuserbyid.experience}</li>
                    <li> {this.state.getuserbyid.address}</li>
                    <li> {this.state.getuserbyid.date}</li>
                    <li><img src={`http://localhost:5001/images/${this.state.getuserbyid.image}`} /></li>

                </ul>




            </div>



        )



    }
}




export default Users;