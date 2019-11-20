import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import NavbarPage from "./components/Header/header"
import FooterPage from "./components/Footer/footer"
import Home from "./pages/Home Page/home"
import SecuredRoute from "./components/SecuredRoute/SecuredRoute"
import CreateProject from "./pages/Create Project/create project"
import Designers from "./pages/Designers/Designers"
import Messages from  "./pages/Messages/Messages"
import Profile from "./pages/Profile/Profile"
import User_view from "./pages/User_view/user_view"
import Project_view from './pages/Project_view/Project_view';
import Login from './components/Login/login'
// import Test from './components/test'



import './App.css';

class App extends React.Component {
 state={
   user_id: 2,
   token: null,
   user: null
 }

 setUser = ({id, token, user}) =>{
   this.setState({user_id:id, token, user})
 }
  render() {
    return (
      <div>
        <NavbarPage  token={this.state.token}/>

        <Switch>

          <Route path='/' exact={true} render={() => { return <Home /> }} />
          <SecuredRoute
              path="/newproject"
              render={props => (
                <CreateProject {...props} onSubmit={this.onSubmit} user_id={this.state.user.user_id} />
              )}
              token={this.state.token}
            />
            }
           
          {/* <Route path='/newproject' render={() => { return <CreateProject /> }} /> */}
          {/* <Route path='/newproject' render={() => { return <Test /> }} /> */}
          {/* <SecuredRoute
              path="/Messages"
              render={props => (
                <Messages {...props} onSubmit={this.onSubmit} />
              )}
              token={this.state.token}
            /> */}

               <SecuredRoute
              path="/Profile"
              render={props => (
                <Profile {...props} onSubmit={this.onSubmit} user_id={this.state.user.user_id} />
              )}
              token={this.state.token}
            />
            

          <Route path='/Designerslist' render={() => { return <Designers /> }} />
          <Route path='/Messages' render={() => { return <Messages /> }} />

          {/* <Route path='/Profile' render={(props) => { return <Profile user_id={this.state.user_id} {...props}/> }} /> */}
          <Route path='/Project-view/:id' render={(props) => { return <Project_view {...props}/> }} />
          <Route path='/user-view/:id' render={(props) => { return <User_view {...props}/> }} />


          <Route path='/Login' render = {(props=> <Login setUser={this.setUser} {...props}/>)}/>



          <Route render={() => <div>Page not found!</div>} />



        </Switch>

        <FooterPage />

      </div>

    )
  }
}

export default withRouter(App);;
