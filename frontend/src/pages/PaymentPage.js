import React, {useState} from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch} from "react-redux";
import {savePayment} from "../actions/cartActions";

const PaymentPage = (props) => {
    const [payment, setPayment] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if(payment){
            dispatch(savePayment({paymentMethod: payment}))
            props.history.push('/placeorder')
        }else{
            setError('Please, choose the payment method.')
        }
    }
    return (
        <div className="pt120 sign-in">
            <CheckoutSteps step1 step2 step3/>
            <div className="form">
                <div className="sign-in-title">
                    Payment
                </div>
                <form onSubmit={submitHandler}>
                    <input type="radio" name="paymentMethod" id="paymentMethod"  value="paypal" onChange={(e) => setPayment(e.target.value)}/>
                    <label htmlFor="paymentMethod" className="radio-label">Paypal</label>
                    <button type="submit" className="sign-in-btn">Continue</button>
                    {error && <div className="sign-in-error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default PaymentPage
