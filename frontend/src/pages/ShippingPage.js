import React, {useEffect, useState} from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch} from "react-redux";
import {saveShipping} from "../actions/cartActions";

const ShippingPage = (props) => {
    const [newPost, setNewPost] = useState(0)
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [city, setCity] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const shipping = JSON.parse(localStorage.getItem('shipping'))
        if(shipping) {
            setName(shipping.name)
            setSurname(shipping.surname)
            setCity(shipping.city)
            setPhone(shipping.phone)
            setNewPost(shipping.newPost)
        }
    }, [])


    const submitHandler = (e) => {
        e.preventDefault()
        if(name && surname && city && phone && newPost){
            dispatch(saveShipping({name, surname, city,newPost,phone}))
            props.history.push('/payment')
        }else{
            setError('Please, enter data!')
        }


    }

    return (
        <div className="pt120 sign-in">
            <CheckoutSteps step1 step2/>
            <div className="form">
               <div className="sign-in-title">
                   Address
               </div>
                <form onSubmit={submitHandler}>
                    <input type="text" name="name" id="name" placeholder="Your name" className="sign-in-input" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" name="surname" id="surname" placeholder="Surname" className="sign-in-input" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <input type="text" name="city" id="city" placeholder="City" className="sign-in-input" value={city} onChange={(e) => setCity(e.target.value)}/>
                    <input type="number" name="newPost" id="newPost" placeholder="Number of New Post" value={newPost} className="sign-in-input" onChange={(e) => setNewPost(e.target.value)}/>
                    <input type="telephone" name="phone" id="phone" placeholder="Your phone" className="sign-in-input" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <button type="submit" className="sign-in-btn">Continue</button>
                    {error && <div className="sign-in-error">{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default ShippingPage
