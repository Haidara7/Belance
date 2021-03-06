import React, { Component } from "react";
import logo from "./red.png";
import "./header.css";
import IfAuthenticated from "../IfAuthenticated/IfAuthenticated"

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <MDBNavbar color="black" dark expand="md" >
        <MDBNavbarBrand>
          {/* <strong className="white-text">Navbar</strong> */}
          <MDBNavLink to="/">  <img className="logo" src={logo} alt="" /></MDBNavLink>

        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
          <IfAuthenticated token = {this.props.token}>
            <MDBNavItem>
              <MDBNavLink to="/NewProject">Create</MDBNavLink>
            </MDBNavItem>
            </IfAuthenticated>
            <MDBNavItem>
              <MDBNavLink to="/Designerslist">Designers</MDBNavLink>
            </MDBNavItem>
            <IfAuthenticated token = {this.props.token}>
            <MDBNavItem>
              <MDBNavLink to="/Profile">Profile</MDBNavLink>
            </MDBNavItem>
            </IfAuthenticated>
            <MDBNavItem>
              {/* <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown> */}
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/Login">
                <i className="Sign_in">SIGN IN</i>              </MDBNavLink>
            </MDBNavItem>
            
            <IfAuthenticated token = {this.props.token}>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/Messages">
                <i className="far fa-envelope message"></i>              </MDBNavLink>
            </MDBNavItem>
            </IfAuthenticated>

            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <i className="fas fa-sign-out-alt sign"></i>              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown> */}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;