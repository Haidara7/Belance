import React from "react";
import NavbarPage from "../../components/Header/header"
import FooterPage from "../../components/Footer/footer"






class CreateProject extends React.Component {
    state = {
        newproject: []
      }
    
      async componentDidMount() {
    
        try {
          const response = await fetch('http://localhost:5001/api/projects/create');
          const result = await response.json();
          console.log(result)
          if (result.success) {
            const newproject = result.result;
            this.setState({ newproject })
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
                <NavbarPage />


                CREATE PROJECTS







                <FooterPage />
            </div>

        )
    }
}




export default CreateProject;