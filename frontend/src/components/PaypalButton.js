import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function PaypalButton(props) {
    const [sdkReady, setSdkReady] = useState(false);

    const addPaypalSdk = async () => {
        const result = await axios.get("http://localhost:5000/api/config/paypal");
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?currency=USD&client-id=' + clientID;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.body.appendChild(script);
    }

    const createOrder = (data, actions) => actions.order.create({
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: props.amount
                }
            }
        ]
    });

    const onApprove = (data, actions) => actions.order
        .capture()
        .then(details => props.onSuccess(data, details))
        .catch(err => console.log(err));

    useEffect(() => {
        if (!window.paypal) {
            addPaypalSdk();
        }

    }, []);

    if (!sdkReady) {
        return  <div className="flex">
          <div className="lds-ring">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    }

    const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

    return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
                   onApprove={(data, actions) => onApprove(data, actions)} />
}

export default PaypalButton;
