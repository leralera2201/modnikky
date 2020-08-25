import React, {useState} from "react";
import {Link} from "react-router-dom";
import {emailRegex, formValid} from '../validation'
import axios from 'axios'



const Reset = (props) => {
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'
    const [error, setError] = useState('')
    const [state, setState] = useState({
        email: '',
        formErrors: {
            email: ''
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
            default:
                break;
        }
        setState({...state, formErrors, [name]: value });
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (formValid(state) && state.email) {
            try{
                const {data} = await axios.post('http://localhost:5000/api/users/reset-password', {email: state.email})
                setError('')
                setMessage(data.message)
                localStorage.setItem('redirect', redirect)
            }catch (e) {
                if (e.response && e.response.data) {
                    setMessage('')
                    setError(e.response.data.error)
                }
            }
        } else {
            setError('Please, input correct email.')
        }

    }

    return (
        <div className="sign-in sign-in-login">
            <div className="sign-in-title">
                Reset password
            </div>
            {error && <div className="sign-in-error">{error}</div>}
            {message && <div className="sign-in-success">{message}</div>}
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
                <button type="submit" className="sign-in-btn" style={{display: 'block'}}>
                    Reset
                </button>
                <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="sign-in-link">Go to sign in</Link>
            </form>
        </div>
    )
}

export default Reset
