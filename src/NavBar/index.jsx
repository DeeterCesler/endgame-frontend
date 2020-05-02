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
                    <NavbarBrand href="/">Fetchspot - Alpha v1.1</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        { this.props.loggedIn ? 
                            <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/logout">Logout</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/help">Help</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/account">Account</NavLink>
                                    </NavItem>
                                    { this.props.owner ?
                                        <NavItem>
                                            <NavLink href="/owner">Owner Panel</NavLink>
                                        </NavItem>
                                        :
                                        null
                                    }
                            </Nav>
                                :
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
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