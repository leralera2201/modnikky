import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../actions/userActions";
import {emailRegex, formValid} from '../validation'



const SignInPage = (props) => {
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo, loading, error} = userSignIn
    const [state, setState] = useState({
        email: '',
        password: '',
        formErrors: {
            email: '',
            password: ''
        }
    })
    const [message, setMessage] = useState('')
    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let formErrors = { ...state.formErrors };
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        setState({...state, formErrors, [name]: value });
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }

    }, [userInfo])// eslint-disable-line react-hooks/exhaustive-deps

    const submitHandler = (e) => {
        e.preventDefault()
        if (formValid(state) && state.email && state.password) {
            dispatch(signIn(state.email, state.password))
            setMessage('')
        } else {
            setMessage('Please, input all data.')
        }

    }
    return (
        <div className="sign-in sign-in-login">
            <div className="sign-in-title">
                Log in
            </div>
            {loading &&
                <div className="flex">
                    <div className="lds-ring">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div>
            }
            {error && <div className="sign-in-error">{error}</div>}
            {message && <div className="sign-in-error">{message}</div>}
            <form onSubmit={submitHandler}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={'sign-in-input' + (state.formErrors.email.length ? ' sign-in-input-error' : '')}
                    placeholder="Email"
                    style={{marginTop: '30px'}}
                    value={state.email || ''}
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
                    value={state.password || ''}
                    onChange={changeHandler}
                />
                {state.formErrors.password.length > 0 && <small className="error">{state.formErrors.password}</small>}
                <Link to={redirect === "/" ? "reset" : "reset?redirect=" + redirect} className="sign-in-link">I don't remember password</Link>
                <button type="submit" className="sign-in-btn" style={{display: 'block'}}>
                    Sign in
                </button>
                <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="sign-in-link">I don't have an account</Link>
            </form>
        </div>
    )
}

export default SignInPage
