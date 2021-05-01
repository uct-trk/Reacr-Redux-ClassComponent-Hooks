import React, { useEffect, useState } from 'react'
import { getCategories } from '../../redux/actions/categoryActions'
import { saveProduct } from '../../redux/actions/productActions'

import { connect } from 'react-redux'
import ProductDetail from './ProductDetail'

const AddOrUpdateProduct = ({ history, products, categories, getProducts, getCategories, saveProduct, ...props }) => {
    const [product, setProduct] = useState({ ...props.product })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        setProduct({ ...props.product })
    }, [props.product]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }))
        validate(name, value)
    }

    function validate(name, value) {
        if (name === "productName" && value === "") {
            setErrors(previousErrors => ({ ...previousErrors, productName: "Product needs name" }))
        } else {
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: ""
            }))
        }
    }

    function handleSave(event) {
        event.preventDefault()
        saveProduct(product).then(() => {
            history.push("/")
        })
    }


    return (
        <ProductDetail
            product={product}
            categories={categories}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors} />
    )
}
export function getProductById(products, productId) {
    let product = products.find(product => product.id == productId) || null
    return product
}


// ownProps= componentlerin kendi içinde barındırdığı propslardır
function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId
    const product = productId && state.productListReducer.length > 0
        ? getProductById(state.productListReducer, productId)
        : {}
    return {
        product,
        products: state.productListReducer,
        categories: state.categoryListReducer
    }
}

const mapDispatchToProps = {
    getCategories, saveProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct)