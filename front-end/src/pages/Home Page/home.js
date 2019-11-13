import React from 'react';
import "./home.css"
import {Link} from 'react-router-dom'


// import NavbarPage from "../../components/Header/header"
// import FooterPage from "../../components/Footer/footer"


class Home extends React.Component {
  state = {
    newestProducts: []
  }

  async componentDidMount() {

    try {
      const response = await fetch('http://localhost:5001/api/projects/newest');
      const result = await response.json();
      console.log(result)
      if (result.success) {
        const newestProducts = result.result;
        this.setState({ newestProducts })
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


      <div className="App">
        <div className="open">

          <h1>Projects from creatives you follow and more</h1>

        </div>
        <div className="pro">

          {this.state.newestProducts.map(x => (<div>
           <Link to={`/Project-view/${x.project_id}`} ><h2 style={{ marginTop: 66 }}>{x.title}</h2></Link>
            < img src={`http://localhost:5001/images/${x.image}`} style={{ width: '300px', height: '230px' }} alt="" />
          </div>
          ))}

{/* <h2 style={{ marginTop: 66 }}> */}



</div>
        
      </div>
    )
  }
}

export default Home;