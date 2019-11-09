import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home Page/home"
import CreateProject from "./pages/Create Project/create project"
import Designers from "./pages/Designers/Designers"
import Messages from "./pages/Messages/Messages"
import Profile from "./pages/Profile/Profile"

import './App.css';

class App extends React.Component {


  render() {
    return (

      


      <Switch>

        <Route path='/' exact={true} render={() => { return <Home /> }} />
        <Route path='/newproject' render={() => { return <CreateProject /> }} />
        <Route path='/Designerslist' render={() => { return <Designers /> }} />
        <Route path='/Messages' render={() => { return <Messages /> }} />
        <Route path='/Profile' render={() => { return <Profile /> }} />







      </Switch>
      

    )
  }
}

export default withRouter(App);;
