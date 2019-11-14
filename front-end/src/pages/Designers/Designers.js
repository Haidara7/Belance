import React from "react";
// import NavbarPage from "../../components/Header/header"
// import FooterPage from "../../components/Footer/footer"
import {Link} from 'react-router-dom'



class Designers extends React.Component {

    state = {
        getusers: []
    }

    async componentDidMount() {

        try {
            const response = await fetch('http://localhost:5001/api/userslist');
            const result = await response.json();
            console.log(result)
            if (result.success) {
                
                const getusers = result.data;
                this.setState({ getusers })
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
                {/* <NavbarPage /> */}

                {this.state.getusers.map(x => (<div>
                    <Link to={`/user-view/${x.user_id}`}>{x.name}</Link>
                </div>
                ))}

                {/* <FooterPage /> */}
            </div>

        )
    }
}




export default Designers;