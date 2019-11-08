import React from 'react';
import NavbarPage from "../../components/Header/header"
import FooterPage from "../../components/Footer/footer"


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

        <NavbarPage />
        {this.state.newestProducts.map(x => (<div>
          <h2>{x.title}</h2>
          <img src={`http://localhost:5001/images/${x.image}`} />
        </div>
        ))}
        <FooterPage />




      </div>
    );
  }
}

export default Home;