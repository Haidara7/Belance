import React from "react";
// import NavbarPage from "../../components/Header/header"
// import FooterPage from "../../components/Footer/footer"
import { Link } from 'react-router-dom'
import "./Designers.css"



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
            <div className="designers" style={{display:'flex', flexWrap:'wrap'}}>

                {this.state.getusers.map(x => (<div style={{width:'30%', margin:'10px', alignSelf:'center'}}>
                    <Link to={{
                        pathname: `/user-view/${x.user_id}`,
                        state: { isTheUser: false }
                    }
                    }
                    ><h2 style={{ marginTop: 66 }}>{x.name}</h2></Link>
                    <h3>{x.aboutme}</h3>
                    <img src={`http://localhost:5001/images/${x.image}`} style={{ width: '180px', height: '180px' }} alt="" />

                </div>
                ))} 

            </div>

        )
    }
}




export default Designers;