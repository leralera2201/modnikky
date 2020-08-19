import React, {useState} from "react";
import {formValid} from '../validation'
import axios from 'axios'



const NewPassword = (props) => {
    const token = props.match.params.id
    // const userSignIn = useSelector(state => state.userSignIn)
    // const { userInfo } = userSignIn
    const [error, setError] = useState('')
    const [state, setState] = useState({
        password: '',
        formErrors: {
            password: ''
        }
    })

    const [message, setMessage] = useState('')

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let formErrors = { ...state.formErrors };
        switch (name) {
            case "password":
                formErrors.password = value.length < 6
                    ? "password can't be less than 6 symbols"
                    : "";
                break;
            default:
                break;
        }
        setState({...state, formErrors, [name]: value });
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        if (formValid(state) && state.password) {
            try{
                const {data} = await axios.post('http://localhost:5000/api/users/new-password', {password: state.password, token})
                const redirect = localStorage.getItem('redirect') || ''
                setError('')
                setMessage(data.message)
                setTimeout(() => {
                    if(redirect === '/' || redirect === ''){
                        props.history.push('/signin')
                    }else{
                        props.history.push('/signin?redirect=' + redirect)
                    }
                }, 2000)
                localStorage.removeItem('redirect')
            }catch (e) {
                if (e.response && e.response.data) {
                    setMessage('')
                    setError(e.response.data.error)
                }
            }
        } else {
            setError('Please, input correct password.')
        }

    }

    return (
        <div className="sign-in sign-in-login">
            <div className="sign-in-title">
                Set new password
            </div>
            {error && <div className="sign-in-error">{error}</div>}
            {message && <div className="sign-in-success">{message}</div>}
            <form onSubmit={submitHandler}>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={'sign-in-input' + (state.formErrors.password.length ? ' sign-in-input-error' : '')}
                    placeholder="Enter new password"
                    style={{marginTop: '30px'}}
                    value={state.password || ''}
                    onChange={changeHandler}
                />
                {state.formErrors.password.length > 0 && <small className="error">{state.formErrors.password}</small>}
                <button type="submit" className="sign-in-btn" style={{display: 'block'}}>
                    Save password
                </button>
            </form>
        </div>
    )
}

export default NewPassword
