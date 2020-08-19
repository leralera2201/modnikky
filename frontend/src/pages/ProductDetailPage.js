import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, saveProductReview} from "../actions/productActions";
import StarRatings from "react-star-ratings";
import {addToCart} from "../actions/cartActions";
import {Link} from 'react-router-dom'
import {SAVE_PRODUCT_REVIEW_RESET} from "../constants/productConstants";

const ProductDetailPage = (props) => {
    const userSignIn = useSelector(state => state.userSignIn)
    const {userInfo} = userSignIn
    const [message, setMessage] = useState('')
    const [className, setClass] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState('')
    const productDetail = useSelector(state => state.productDetail)
    const {product, loading, error} = productDetail
    const dispatch = useDispatch()

    const productSaveReview = useSelector(state => state.productSaveReview)
    const {success: productSaveSuccess} = productSaveReview

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const changeRating = (newRating ) => {
        setRating(newRating);
    }

    const handleIncrement = value => {
        if (value < product.countInStock) {
            value++;
        }
        setQuantity(value);
    };
    const handleDecrement = value => {
        if (value > 1) {
            value--;
        }
        setQuantity(value);
    };
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    const submitHandler = () => {
        if(!size){
            setMessage('Please, select size.')
            setClass('sign-in-error')
        }else{
            dispatch(addToCart(product._id, quantity, size))
            setMessage('The product was given to cart successfully.')
            setClass('sign-in-success')
        }
    }
    const submitRating = (e) => {
        e.preventDefault()
        dispatch(saveProductReview(props.match.params.id, {rating, comment, name: userInfo.name + ' ' + userInfo.surname}))
    }

    const changeSize = (e) => {
        setSize(e.target.value)
        const sizes = document.getElementsByClassName('detail-product__checkbox')
        for(let size of sizes){
            if(size !== e.target){
                size.nextSibling.style.borderBottom = 'none'
            }else{
                size.nextSibling.style.borderBottom= '1px solid #000F08'
            }
        }
    }

    useEffect(() => {
        if(productSaveSuccess){
            alert('Review was added')
            setComment('')
            setRating(0)
            dispatch({type: SAVE_PRODUCT_REVIEW_RESET})
        }
        dispatch(getProduct(props.match.params.id))
    }, [productSaveSuccess])// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="pt120">
            <div className="detail-product">
                <div className="flex">
                    {loading && <div className="lds-ring">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>}
                    {error && <div className="sign-in-error">{error}</div>}
                </div>
                    {product &&
                    <div className="shop-wrapper">

                        <div className="detail-product__img">
                            <img src={product.imageUrl} alt="Product"/>
                        </div>
                        <div className="detail-product__info">
                            <div className="detail-product__name">{product.name}</div>
                            {product.description && <div className="detail-product__description">{product.description}</div>}
                            {product.brand && <div className="detail-product__brand ">Brand:    {product.brand}</div>}
                            <div className="detail-product__rating">
                                <StarRatings
                                    rating={product.rating}
                                    starRatedColor="#C8B707"
                                    name='rating'
                                />
                                <div className="detail-product__numReviews">
                                    ({product.numReviews} reviews)
                                </div>
                            </div>
                            <div className="detail-product__color-title">
                                Color
                            </div>
                            <div className="detail-product__colors">
                                    <div className="active-color"
                                         style={{backgroundColor: '#' + product.color}}/>
                            </div>

                            <div className="detail-product__color-title">
                                Size
                            </div>
                            <div className="detail-product__sizes">
                                {product.sizes && product.sizes.map(size => (
                                    <div key={size}>
                                        <input
                                            type="checkbox"
                                            name={size}
                                            id={size}
                                            value={size}
                                            onClick={changeSize}
                                            className="detail-product__checkbox"
                                        />
                                        <label
                                            htmlFor={size}
                                            className="detail-product__label detail-product__label-size"
                                        >
                                            {size}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {product.countInStock > 0 ?
                            <>
                                <div className="detail-product__color-title">
                                    Choose quantity
                                </div>
                                <div className="detail-product__sizes-number">
                                    <button className="minus" onClick={() => handleDecrement(quantity)}
                                    />
                                    <input className="quantity"   name="quantity" value={quantity} type="number" onChange={(e) => handleChange(e)}/>
                                    <button onClick={() => handleIncrement(quantity)}
                                            className="plus"/>
                                </div>
                            </>
                                :
                                <div className="detail-product__color-title">
                                    Out of stock
                                </div>
                            }
                            <div className="detail-product__price">UAH {product.price}</div>
                            <button className="detail-product__btn sign-in-btn" onClick={submitHandler}>Add to cart</button>
                            {message && <div className={"detail-product__message " + className}>
                                {message}
                            </div>}
                        </div>
                    </div>
                    }

            </div>
            <div className="content-margined">
                { product &&
                    <div className="container comment-flex" >
                        <div className="detail-product__name" style={{marginTop: '80px'}}>Reviews</div>
                        {!product.reviews.length && <div className="detail-product__color-title">There is no review</div>}
                        <ul id="reviews" style={{marginTop: '30px'}} >
                            { product.reviews &&  product.reviews.map((review) => (
                                <li key={review._id} style={{marginTop: '20px'}}>
                                    <div className="flex-between">
                                        <div className="detail-product__comment-name">{review.name}</div>
                                        <div>{review.createdAt.substring(0, 10)}</div>
                                    </div>
                                    <div>
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="orange"
                                            name='rating'
                                        />
                                    </div>
                                    <div className="detail-product__color-title">{review.comment}</div>
                                </li>
                            ))}
                            <li className="comment-flex" style={{marginTop: '50px'}}>
                                <div className="detail-product__name">Write a customer review</div>
                                {userInfo ? (
                                    <form onSubmit={submitRating}>
                                        <ul className="form-container">
                                            <li style={{marginTop: '10px'}} className="comment-flex">
                                                <StarRatings
                                                    rating={rating}
                                                    starRatedColor="orange"
                                                    changeRating={changeRating}
                                                    name='rating'
                                                />
                                            </li>
                                            <li style={{marginTop: '10px'}}>
                                                <textarea
                                                    placeholder="Add a coment"
                                                    className="textarea-comment"
                                                    name="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </li>
                                            <li className="comment-flex">
                                                <button type="submit" className="sign-in-btn" style={{marginTop:'10px'}}>
                                                    Submit
                                                </button>
                                            </li>
                                        </ul>
                                    </form>
                                ) : (
                                    <div className="detail-product__color-title">
                                        Please <Link to="/signin">Sign-in</Link> to write a review.
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default ProductDetailPage
