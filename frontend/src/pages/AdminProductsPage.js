import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, listProducts, saveProduct} from "../actions/productActions";
import {listCategory} from "../actions/categoryActions";
import axios from 'axios'
import {formValid} from '../validation'


const AdminProductsPage = () => {
    const [state, setState] = useState({
        name: '',
        id: '',
        description: '',
        isActive: true,
        imageUrl: '',
        price: '',
        brand: '',
        color: '',
        category: '',
        countInStock: '',
        sizes: '',
        formErrors: {
            name: '',
            description: '',
            price: '',
            brand: '',
            color: '',
            category: '',
            countInStock: '',
            sizes: ''
        }
    })
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')

    const productList = useSelector(state => state.productList)
    const {products, error, loading} = productList

    const categoryList = useSelector(state => state.categoryList)
    const {categories} = categoryList

    const productSave = useSelector(state => state.productSave)
    const {success: successSave, error: errorSave, loading: loadingSave} = productSave

    const dispatch = useDispatch()
    const productDelete = useSelector(state => state.productDelete);
    const {success: successDelete} = productDelete;

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (successSave) {
            setModal(false);
        }
        dispatch(listCategory(true))
        dispatch(listProducts('', '', '', true));
    }, [successSave, successDelete])// eslint-disable-line react-hooks/exhaustive-deps

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let formErrors = { ...state.formErrors };
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "color":
                formErrors.color =
                    value.length !== 6 ? "6 characaters required." : "";
                break;
            case "brand":
                formErrors.brand =
                    value.length > 30 ? "maximum 30 characaters required" : "";
                break;
            case "category":
                formErrors.category =
                    value.length === 0 ? "Category is required" : "";
                break;
            case "price":
                formErrors.price =
                    value.length === 0 ? "Price is required" : value > 0 ? "" : "Price must be greater than 0";
                break;
            case "countInStock":
                formErrors.countInStock =
                    value.length === 0 ? "Count in stock is required" : value > 0 ? "" : "Count in stock must be greater than 0";
                break;
            case "sizes":
                formErrors.sizes =
                    value.length === 0 ? "Sizes are required. Choose some." : "";
                break;
            case "description":
                formErrors.description =
                    value.length > 200 ? "maximum 200 characaters required" : "";
                break;
            default:
                break;
        }

        setState({...state, formErrors, [name]: value });
    }
    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId))
    }


    const openModal = (product=null) => {
        setModal(true);
        if(product){
            setState({...state,
                id: product._id,
                name: product.name,
                description: product.description,
                imageUrl: product.imageUrl,
                price: product.price,
                countInStock: product.countInStock,
                brand: product.brand,
                color: product.color,
                sizes: product.sizes.join(' '),
                category: product.category ? product.category._id : '',
                isActive: product.isActive
            })
        }else{
            setState({...state,
                id: '',
                name: '',
                description: '',
                imageUrl: '',
                price: '',
                countInStock: '',
                brand: '',
                color: '',
                sizes: '',
                category: '',
                isActive: true
            })
        }

    }
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setState({...state, imageUrl: ''})
    }
    const submitHandler = async(e) => {
        e.preventDefault()
        if(file){
            if (formValid(state) && state.name && state.category && state.price && state.color && state.sizes &&state.countInStock){
                const formData = new FormData();
                formData.append('myImage', file);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                try{
                    const {data} = await axios.post("http://localhost:5000/api/uploads",formData,config)
                    dispatchSaveProduct(data)
                    setMessage('')
                }catch (e) {
                    console.log(e);
                }
            }else {
                setMessage('Please, add all data')
            }
        }else{
            if (formValid(state) && state.id && state.name && state.category && state.price && state.color && state.sizes &&state.countInStock){
                dispatchSaveProduct(state.imageUrl)
                setMessage('')
            }else {
                setMessage('Please, add all data')
            }
        }
    }
    const dispatchSaveProduct = (img) => {
        dispatch(saveProduct({
            _id: state.id,
            name: state.name,
            category: state.category,
            brand: state.brand,
            color: state.color,
            sizes: state.sizes.trim().split(' '),
            imageUrl: img,
            description: state.description,
            isActive: state.isActive,
            price: state.price,
            countInStock: state.countInStock}))
    }
    const style = products && products.length ? {overflowX:'auto'} : {}

    return (
        <div className="pt120 admin-container">
            <div className="table " style={style}>
                <div className="create-product" onClick={() => openModal()}>
                    <div className="create-product-link">
                        Create product</div>
                </div>
                {modal && <>
                    {loadingSave && <div className="flex">
                        <div className="lds-ring">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>}
                    {errorSave && <div className="sign-in-input">{errorSave}</div>}
                    <form className="sign-in-form" id="edit" onSubmit={submitHandler}>
                        <label htmlFor="name" className="label">Product title</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Title..."
                            className={'sign-in-input' + (state.formErrors.name.length ? ' sign-in-input-error' : '')}
                            value={state.name}
                            onChange={changeHandler}/>
                        {state.formErrors.name.length > 0 && <small className="error">{state.formErrors.name}</small>}
                        <label htmlFor="description" className="label">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Description..."
                            className={'sign-in-input' + (state.formErrors.description.length ? ' sign-in-input-error' : '')}
                            value={state.description}
                            onChange={changeHandler}/>
                        {state.formErrors.description.length > 0 && <small className="error">{state.formErrors.description}</small>}
                        <br/>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            {file ? file.name : 'Upload file'}
                        </label>
                        <input id="file-upload" type="file" name="myImage" onChange= {onChange} />
                        {state.imageUrl && <img src={state.imageUrl} alt="" style={{maxWidth: '200px', margin: '20px 0', display: 'block'}}/>}
                        <label htmlFor="brand" className="label">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            placeholder="Brand..."
                            className={'sign-in-input' + (state.formErrors.brand.length ? ' sign-in-input-error' : '')}
                            value={state.brand}
                            onChange={changeHandler}/>
                        {state.formErrors.brand.length > 0 && <small className="error">{state.formErrors.brand}</small>}
                        <label htmlFor="price" className="label">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price..."
                            className={'sign-in-input' + (state.formErrors.price.length ? ' sign-in-input-error' : '')}
                            value={state.price}
                            onChange={changeHandler}/>
                        {state.formErrors.price.length > 0 && <small className="error">{state.formErrors.price}</small>}
                        <label htmlFor="countInStock" className="label">Count in stock</label>
                        <input
                            type="number"
                            id="countInStock"
                            name="countInStock"
                            placeholder="Count In Stock..."
                            className={'sign-in-input' + (state.formErrors.countInStock.length ? ' sign-in-input-error' : '')}
                            value={state.countInStock}
                            onChange={changeHandler}/>
                        {state.formErrors.countInStock.length > 0 && <small className="error">{state.formErrors.countInStock}</small>}
                        <label htmlFor="color" className="label">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Color..."
                            className={'sign-in-input' + (state.formErrors.color.length ? ' sign-in-input-error' : '')}
                            value={state.color}
                            onChange={changeHandler}/>
                        {state.formErrors.color.length > 0 && <small className="error">{state.formErrors.color}</small>}
                        <label htmlFor="sizes" className="label">Sizes</label>
                        <input
                            type="text"
                            id="sizes"
                            name="sizes"
                            placeholder="Sizes..."
                            className={'sign-in-input' + (state.formErrors.sizes.length ? ' sign-in-input-error' : '')}
                            value={state.sizes}
                            onChange={changeHandler}/>
                        {state.formErrors.sizes.length > 0 && <small className="error">{state.formErrors.sizes}</small>}
                        <label htmlFor="isActive" className="label">Status</label>
                        <select
                            id="isActive"
                            className="select"
                            onChange={(e) =>setState({...state, isActive: !!(e.target.value)})}>
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="true">Active</option>
                            <option value="">Not active</option>
                        </select>
                        <label htmlFor="category" className="label">Category</label>
                        <select
                            id="category"
                            className="select"
                            name="category"
                            value={state.category}
                            onChange={changeHandler}>
                            <option value="" selected disabled hidden>Choose here</option>
                            {categories && categories.map(category => (
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))}
                        </select>

                        {message && <div className="sign-in-error">{message}</div>}

                        <button type="submit" className="sign-in-btn">{state.id ? 'Update' : 'Create'}</button>
                            <button
                                type="button"
                                className="sign-in-btn"
                                onClick={() => setModal(false)}
                                style={{marginLeft: '20px', backgroundColor: '#383738'}}
                            >
                                Back
                            </button>
                    </form>
                </>}
                {loading ? <div className="flex">
                        <div className="lds-ring">
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div> :
                error ?
                    <div className="sign-in-error">{error}</div>
                    :
                    products.length ?
                        <table id="table" >
                            <thead>
                            <tr>
                                <th>#</th>
                                <th className="bigger-th">Name</th>
                                <th>Image</th>
                                <th className="biggest-th">Description</th>
                                <th>Brand</th>
                                <th>Sizes</th>
                                <th>Color</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Count Reviews</th>
                                <th>Count In Stock</th>
                                <th>Active</th>
                                <th>Delete</th>
                            </tr>
                            </thead>

                            <tbody>

                            {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index+1}</td>
                                        <td onClick={() => openModal(product)}><a href="#edit">{product.name}</a></td>
                                        <td>
                                            <img src={product.imageUrl} className="table-img" alt=""/></td>
                                        <td>{product.description}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.sizes.join(' ')}</td>
                                        <td>
                                            <div className="active-color"
                                                 style={{backgroundColor: '#' + product.color}}/>
                                        </td>

                                        <td>{product.category ? product.category.name : 'Please add category'}</td>
                                        <td>{product.price}</td>
                                        <td>{product.rating}</td>
                                        <td>{product.numReviews}</td>
                                        <td>{product.countInStock}</td>
                                        <td>{product.isActive.toString()}</td>
                                        <td className="table-center">
                                            <button className="sign-in-btn table-btn" onClick={() => deleteHandler(product._id)}>
                                            Delete
                                            </button>
                                        </td>
                                    </tr>

                            ))}
                            </tbody>
                        </table>
                        :
                        <div className="product__title" style={{textAlign: 'center'}}>There are no products in database. Please, add some.</div>
                }

            </div>
        </div>
    )
}

export default AdminProductsPage
