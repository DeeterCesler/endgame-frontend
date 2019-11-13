import React, {Component} from "react";
import {Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink} from "reactstrap";

export default class NavBar extends Component{
    constructor(props) {
        super(props);
        
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <div id="navbar">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FollowUp - Beta version 1.0</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        { this.props.loggedIn ? 
                            <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/contacts/all">See all contacts</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/contacts/new">New contact</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/logout">Logout</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/help">Help</NavLink>
                                    </NavItem>
                            </Nav>
                                :
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/help">Help</NavLink>
                                </NavItem>
                            </Nav>
                        }
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}