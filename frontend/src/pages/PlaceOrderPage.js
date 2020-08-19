import React, {useEffect, useState} from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import PaypalButton from "../components/PaypalButton";
import axios from "axios";
import {createOrder} from "../actions/orderActions";

const PlaceOrderPage = (props) => {
    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2);
    const itemsCount = cartItems.reduce((a, c) => a + c.qty, 0);
    const [message, setMessage] = useState('')
    const orderCreate = useSelector(state => state.orderCreate)
    const {success} = orderCreate

    if (!shipping.name || !shipping.surname || !shipping.city || !shipping.newPost || !shipping.phone) {
        props.history.push("/shipping");
    } else if (!payment.paymentMethod) {
        props.history.push("/payment");
    }
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)

    const getAmount = async () => {
        const {data} = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        const {buy} = data.find(el => el.ccy === "USD")
        return itemsPrice / Number(buy)
    }
    async function f() {
        const value = await getAmount()
        setAmount(value)
    }
    f()

    useEffect(() => {
        if(success){
            setMessage('Your order created successfully. Thanks for order!')
            // setTimeout(() => {
            //     props.history.push('/products')
            // }, 4000)
        }else{
            setMessage('')
        }
    }, [success])

    const onSuccessHandler = (paymentResult) => {
        const newCartItems = cartItems.map(cartItem => {
            return {
                name: cartItem.name,
                price: cartItem.price,
                size: cartItem.size,
                imageUrl: cartItem.imageUrl,
                qty: cartItem.qty,
                product: cartItem._id
            }
        })
        dispatch(createOrder({
            orderItems: newCartItems, shipping, payment, itemsPrice, paymentResult
        }));


    }
    return (
        <div className="pt120">
            <div className="container">
                    <div className="checkout">
                        <CheckoutSteps step1 step2 step3 step4/>
                    </div>
                <div className="placeorder">
                    <div className="placeorder-shipping">
                        <div className="shipping__title">Shipping</div>
                        <div className="shipping__info">Name: <span>{shipping.name} {shipping.surname}</span></div>
                        <div className="shipping__info">Delivery: <span>{shipping.city}, NP {shipping.newPost}</span></div>
                        <div className="shipping__info">Phone: <span>{shipping.phone}</span></div>
                    </div>
                    <div className="placeorder-payment">
                        <div className="shipping__title">Payment</div>
                        <div className="shipping__info">Payment method: <span>{payment.paymentMethod}</span></div>
                    </div>
                    <div className="placeorder-total">
                        <div className="shipping__title">Total</div>
                        <div className="shipping__info">Total items: <span>{itemsCount}</span> </div>
                        <div className="shipping__info">Total price: <span>{itemsPrice}</span> UAH</div>
                    </div>
                </div>
                <div className="cart-container pt50">
                    <div className="cart__items">
                        {cartItems.map(cartItem => (
                            <div className="cart__item" key={cartItem._id}>
                                <div className="item__img">
                                    <img src={cartItem.imageUrl} alt=""/>
                                </div>
                                <div className="item__info">
                                    <div className="item__name">
                                        {cartItem.name}
                                    </div>
                                    <div className="item__price">UAH {cartItem.price}</div>
                                    <div className="detail-product__price">
                                        Quantity: {cartItem.qty}
                                    </div>
                                    <div className="item__color ">
                                        <div className="subtitle-flex">
                                            <div className="detail-product__color-title ">
                                                Color
                                            </div>
                                            <div className="item-active-color">
                                                <div className="active-color" key={cartItem.color}
                                                     style={{backgroundColor: '#' +  cartItem.color}}/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="item__size ">
                                        <div className="subtitle-flex">
                                            <div className="detail-product__color-title "
                                            >
                                                Size
                                            </div>
                                            <div className="item-active-color">
                                                <div className="active-size">
                                                    {cartItem.size}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
                {cartItems.length &&
                    <div className="paypal">
                        <PaypalButton amount={+(amount.toFixed(2))} onSuccess={onSuccessHandler}/>
                        {message && <div className="sign-in-success">{message}</div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default PlaceOrderPage
