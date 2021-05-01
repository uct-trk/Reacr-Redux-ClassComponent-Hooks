import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Badge,
  } from 'reactstrap';
import CartSummary from '../cart/CartSummary';

class Navi extends Component {
    render() {
        return (
            <div>
      <Navbar color="success" light expand="md" className="mb-4">
        <NavbarBrand className="text-white"><Link to="/" className="text-white text-decoration-none">UCT STORE</Link></NavbarBrand>
        <NavbarToggler/>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/saveproduct"><Badge className="text-success bg-white">Create Product</Badge></Link></NavLink>
            </NavItem>
            <CartSummary/>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
        )
    }
}
export default Navi