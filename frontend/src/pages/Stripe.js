import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';
import "../Stripe.css"
import axios from 'axios'
import {REACT_APP_STRIPE_PK} from "../config";

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};

const CheckoutForm = ({onSuccessHandler, amount}) => {
    const [status, setStatus] = useState(false)
    const [errorStatus, setErrorStatus] = useState('')
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();


    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card)
        if (result.error) {
            setError(result.error.message);
        } else {
            setError(null);
            stripeTokenHandler(result.token);
        }
    };

    async function stripeTokenHandler(token) {
        try{
            await axios.post('http://localhost:5000/charge', {token: token.id, amount},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            onSuccessHandler()
            setErrorStatus('')
            setStatus(true)

        }catch (e) {
            setStatus(false)
            if (e.response && e.response.data) {
                setErrorStatus(e.response.data.error)
            }
        }

    }


    return (
        <>
            {!status &&
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="card-element">
                            Credit or debit card
                        </label>
                        <CardElement
                            id="card-element"
                            options={CARD_ELEMENT_OPTIONS}
                            onChange={handleChange}
                        />
                        <div className="card-errors" role="alert">{error}</div>
                    </div>
                    {status && <div className="sign-in-success">Success</div>}
                    {errorStatus && <div className="sign-in-error">{errorStatus}</div>}
                    <button type="submit" className="sign-in-btn" style={{display: 'flex'}}>Submit Payment</button>
                </form>
            }

        </>

    );
}

const stripePromise = loadStripe(REACT_APP_STRIPE_PK);

 const AppStripe = ({onSuccessHandler, amount}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm onSuccessHandler={onSuccessHandler} amount={amount}/>
        </Elements>
    );
}

export default AppStripe

