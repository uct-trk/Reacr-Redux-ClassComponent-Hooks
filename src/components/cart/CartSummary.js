import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    Badge,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import alertify from 'alertifyjs'

class CartSummary extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product)
        alertify.error(product.productName + "<br/>" + "Removed From Cart")
    }

    // sepet boşkenki operasyon
    renderEmpty() {
        return (
            <NavItem>
                <NavLink><Badge className="text-info bg-white">Empty Cart</Badge></NavLink>
            </NavItem>
        )
    }
    
    // sepette ürün varken
    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white" nav caret>
                    My Cart
              </DropdownToggle>
                <DropdownMenu right>
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem className="d-flex justify-content-between" key={cartItem.product.id}> 
                                <Badge color="danger" onClick={() => this.removeFromCart(cartItem.product)}>X</Badge>
                                {cartItem.product.productName}
                                <Badge color="success">{cartItem.quantity}</Badge>
                                {console.log(cartItem)}
                            </DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/cart">
                        Go to Cart
                        </Link>
                </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    render() {
        return (
            // sepet boşsa renderEmpty göster, doluysa renderSummary göster
            <div>
                {
                    this.props.cart.length > 0
                        ? this.renderSummary()
                        : this.renderEmpty()
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions:{
            removeFromCart: bindActionCreators(removeFromCart, dispatch)
        }
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)