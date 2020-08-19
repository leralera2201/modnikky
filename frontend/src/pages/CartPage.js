import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";

const CartPage = (props) => {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()
    const totalQuantity = cartItems.reduce(((a,c) => a + c.qty), 0)
    const totalPrice = cartItems.reduce(((a,c) => a + c.price*c.qty), 0)


    const handleIncrement = item => {
        let qty = item.qty
        if (qty < item.countInStock) {
            qty ++;
        }
        dispatch(addToCart(item._id, qty, item.size))
    };
    const handleDecrement = item => {
        let qty = item.qty
        if (qty > 1) {
            qty --;
        }
        dispatch(addToCart(item._id, qty, item.size))

    };

    const handleChange = (item) => {
        let qty = item.qty
        if (qty > 1 && qty < item.countInStock) {
            dispatch(addToCart(item._id, qty,  item.size))
        }
    }
    const deleteHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const proceedHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return(
        <div className="pt120">
            <div className="cart-container">
            {!cartItems.length ? <div className="empty">
                Please, add something to bag. There are nothing here.
            </div> :
                <>
                    <div className="cart__top">
                        <div className="cart__title">
                            Bag
                            <span>{cartItems.length} items</span>
                        </div>
                    </div>
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
                                    <div className="mt10">
                                        <div className="subtitle-flex ">
                                            <div className="detail-product__color-title ">
                                                Color
                                            </div>
                                            <div className="item-active-color">
                                                <div className="active-color"
                                                     style={{backgroundColor: '#' + cartItem.color}}/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="item__size">
                                        <div className="subtitle-flex">
                                            <div className="detail-product__color-title ">
                                                Size
                                            </div>
                                            <div className="item-active-color">
                                                    <div className="active-size">
                                                        {cartItem.size}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail-product__sizes-number">
                                        <button className="minus" onClick={() => handleDecrement(cartItem)}
                                        />
                                        <input className="quantity"   name="quantity" value={cartItem.qty} type="number" onChange={() => handleChange(cartItem)}/>
                                        <button onClick={() => handleIncrement(cartItem)}
                                                className="plus"/>
                                    </div>
                                </div>
                                <div style={{'cursor' : 'pointer'}} className="close" onClick={() => {deleteHandler(cartItem._id)}}/>

                            </div>
                        ))
                        }
                    </div>
                    <div className="cart__bottom">
                        <div className="cart-total-qty">Items in cart: {totalQuantity}</div>
                        <div className="cart-total">Total: UAH {totalPrice.toFixed(2)}</div>
                        <button onClick={proceedHandler} className="sign-in-btn" disabled={cartItems.length === 0 } style={{margin: '20px auto'}}>Proceed to checkout</button>
                    </div>
                </>
            }
            </div>

        </div>
    )
}

export default CartPage
