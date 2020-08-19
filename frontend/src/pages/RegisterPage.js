import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp} from "../actions/userActions";
import {emailRegex, formValid} from '../validation'

const RegisterPage = (props) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: '',
        formErrors: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: ''
        }
    })
    const [message, setMessage] = useState('')
    const userSignUp = useSelector(state => state.userSignUp)
    const { userInfo, loading, error, success} = userSignUp

    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'

    useEffect(() => {
        if(userInfo){
            dispatch(signIn(state.email, state.password))
            setTimeout(() => {
                props.history.push(redirect)
            }, 3000)
        }
    }, [userInfo])// eslint-disable-line react-hooks/exhaustive-deps

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let formErrors = { ...state.formErrors };
        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "repassword":
                formErrors.repassword =
                    value === state.password ? "" : "Passwords dont match";
                break;
            default:
                break;
        }

        setState({...state, formErrors, [name]: value });
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (formValid(state) && state.email && state.password && state.firstName && state.lastName && state.repassword) {
            dispatch(signUp(state.email, state.password, state.firstName, state.lastName))
            setMessage('')
        } else {
            setMessage('Please, input all data.')
        }
    }

    return (
        <div className="sign-in">
            <div className="sign-in-title">
               Create account
            </div>
            {loading && <div className="flex">
                <div className="lds-ring">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>}
            {error && <div className="sign-in-error">{error} </div>}
            {message && <div className="sign-in-error">{message}</div>}
            {success && <div className="sign-in-success">User was created successfully</div>}

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="firstName"
                    id="name"
                    className={'sign-in-input' + (state.formErrors.firstName.length ? ' sign-in-input-error' : '')}
                    placeholder="First name"
                    value={state.firstName}
                    style={{marginTop: '30px'}}
                    onChange={changeHandler}
                />
                {state.formErrors.firstName.length > 0 && <small className="error">{state.formErrors.firstName}</small>}
                <input
                    type="text"
                    name="lastName"
                    id="surname"
                    className={'sign-in-input' + (state.formErrors.lastName.length ? ' sign-in-input-error' : '')}
                    placeholder="Last name"
                    value={state.lastName}
                    style={{marginTop: '30px'}}
                    onChange={changeHandler}
                />
                {state.formErrors.lastName.length > 0 && <small className="error">{state.formErrors.lastName}</small>}
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={'sign-in-input' + (state.formErrors.email.length ? ' sign-in-input-error' : '')}
                    placeholder="Email"
                    style={{marginTop: '30px'}}
                    value={state.email}
                    onChange={changeHandler}
                />
                {state.formErrors.email.length > 0 && <small className="error">{state.formErrors.email}</small>}
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    style={{marginTop: '30px'}}
                    className={'sign-in-input' + (state.formErrors.password.length ? ' sign-in-input-error' : '')}
                    value={state.password}
                    onChange={changeHandler}
                />
                {state.formErrors.password.length > 0 && <small className="error">{state.formErrors.password}</small>}
                <input
                    type="password"
                    name="repassword"
                    id="repassword"
                    placeholder="Repeat password"
                    style={{marginTop: '30px'}}
                    className={'sign-in-input' + (state.formErrors.repassword.length ? ' sign-in-input-error' : '')}
                    value={state.repassword}
                    onChange={changeHandler}
                />
                {state.formErrors.repassword.length > 0 && <small className="error">{state.formErrors.repassword}</small>}
                <button type="submit" className="sign-in-btn" style={{display: 'block'}}>
                    Sign up
                </button>
                <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="sign-in-link">I have an account</Link>
            </form>
        </div>
    )
}

export default RegisterPage
