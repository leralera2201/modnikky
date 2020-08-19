import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory, listCategory, saveCategory} from "../actions/categoryActions";
import {formValid} from '../validation'


const AdminCategoriesPage = () => {
    const [state, setState] = useState({
        name: '',
        id: '',
        description: '',
        isActive: true,
        formErrors: {
            name: '',
            description: '',
        }
    })
    const [modal, setModal] = useState(false)
    // const [name, setName] = useState('')
    // const [id, setId] = useState('')
    // const [description, setDescription] = useState( '')
    // const [isActive, setIsActive] = useState(true)
    //
    const [message, setMessage] = useState('')

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let formErrors = { ...state.formErrors };
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
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

    const submitHandler = (e) => {
        e.preventDefault()
        if (formValid(state) && state.name) {
            dispatch(saveCategory({_id: state.id, name: state.name, description: state.description, isActive: state.isActive}))
            setMessage('')
        } else {
            if(!state.name){
                setMessage('Please, add name')
            }else{
                setMessage('Please, add right data')
            }
        }

    }


    const categoryList = useSelector(state => state.categoryList)
    const {categories, loading, error} = categoryList

    const categorySave = useSelector(state => state.categorySave)
    const {success: successSave, error: errorSave, loading: loadingSave} = categorySave

    const dispatch = useDispatch()
    const categoryDelete = useSelector(state => state.categoryDelete);
    const {success: successDelete} = categoryDelete;


    useEffect(() => {
        if (successSave) {
            setModal(false)
        }
        dispatch(listCategory(true))
    }, [successSave, successDelete])// eslint-disable-line react-hooks/exhaustive-deps

    const deleteHandler = (categoryId) => {
        dispatch(deleteCategory(categoryId))
    }
    const openModal = (category=null) => {
       setModal(true)
        if(category){
            setState({...state, id: category._id, name: category.name, description: category.description, isActive: category.isActive})
        }else{
            setState({...state, id: '', name: '', description: '', isActive: true})
        }

    }

    const style = categories && categories.length ? {overflowX:'auto'} : {}
    return (
        <div className="pt120 admin-container">
            <div className="table " style={style}>
                <div className="create-product" onClick={() => openModal()}>
                    <div className="create-product-link">
                        Create category</div>
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
                    {errorSave && <div className="sign-in-error">{errorSave}</div>}
                    <form className="sign-in-form" id="edit" onSubmit={submitHandler}>
                        <label htmlFor="name" className="label">Category name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name..."
                            className={'sign-in-input' + (state.formErrors.name.length ? ' sign-in-input-error' : '')}
                            name="name" value={state.name}
                            onChange={changeHandler}/>
                        {state.formErrors.name.length > 0 && <small className="error">{state.formErrors.name}</small>}
                        <label htmlFor="name" className="label">Description</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Description..."
                            className={'sign-in-input' + (state.formErrors.description.length ? ' sign-in-input-error' : '')}
                            name="description"
                            value={state.description}
                            onChange={changeHandler}/>
                        {state.formErrors.description.length > 0 && <small className="error">{state.formErrors.description}</small>}
                        <label htmlFor="isActive" className="label">Status</label>
                        <select  id="isActive" className="select"  onChange={(e) =>setState({...state, isActive: !!(e.target.value)})}>
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="true">Active</option>
                            <option value="">Not active</option>
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
                        categories.length ?
                            <table id="table" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="bigger-th">Name</th>
                                    <th className="biggest-th">Description</th>
                                    <th>Active</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>

                                <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index+1}</td>
                                        <td onClick={() => openModal(category)}><a href="#edit">{category.name}</a></td>
                                        <td>{category.description ? category.description : '-'}</td>
                                        <td>{category.isActive.toString()}</td>
                                        <td className="table-center">
                                            <button className="sign-in-btn table-btn" onClick={() => deleteHandler(category._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            :
                            <div className="product__title" style={{textAlign: 'center'}}>There are no categories in database. Please, add some.</div>
                }

            </div>
        </div>
    )
}

export default AdminCategoriesPage
