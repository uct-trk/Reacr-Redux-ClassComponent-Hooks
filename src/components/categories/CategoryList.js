import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { changeCategory, getCategories } from '../../redux/actions/categoryActions'
import { getProducts } from '../../redux/actions/productActions'

class CategoryList extends Component {
    componentDidMount() {
        this.props.actions.getCategories()
    }

    selectCategory = (category) => {
        this.props.actions.changeCategory(category)
        this.props.actions.getProducts(category.id)
    }

    render() {
        return (
            <div>
                <h2>
                <Badge color="info">Categories</Badge>
                </h2>
                <ListGroup>
                    {
                        this.props.categories.map((category) => (
                            <ListGroupItem 
                                active={category.id === this.props.currentCategory.id} 
                                key={category.id} 
                                onClick={() => this.selectCategory(category)}>
                                {category.categoryName}
                            </ListGroupItem>
                        ))
                    }

                </ListGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCategories: bindActionCreators(getCategories, dispatch),
            changeCategory: bindActionCreators(changeCategory, dispatch),
            getProducts: bindActionCreators(getProducts, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)