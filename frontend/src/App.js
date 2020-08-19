import React from 'react';
import {Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./actions/userActions";
import {
    PlaceOrderPage,
    HomePage,
    ShippingPage,
    SignInPage,
    ShopPage,
    RegisterPage,
    CartPage,
    ProductDetailPage,
    PaymentPage,
    AdminProductsPage, AdminOrdersPage,
    AdminCategoriesPage
} from "./pages";
import Reset from "./pages/Reset";
import NewPassword from "./pages/NewPassword";


function App() {

    const userSignIn = useSelector(state=> state.userSignIn)
    const{userInfo} = userSignIn
    const cart = useSelector( state => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()
    const submitHandler = () => {

    }
   const logoutHandler = () => {
        dispatch(logout())
   }


  return (
    <div className="wrapper">
      <header className="header">
          <div className="container">
              <div className="header__inner">
                  <nav className="header__menu header__menu-item">
                      <ul className="menu__list">
                          <li className="menu__item"><Link to='/' className="menu__link" >NEW ARRIVALS</Link></li>
                          <li className="menu__item"><Link to='/products' className="menu__link" >SHOP</Link></li>
                      </ul>
                  </nav>
                  <div className="header__logo header__menu-item">
                      <Link to='/' className="logo" >Modnikky</Link>
                  </div>
                  <nav className="header__menu header__menu-item">
                      <ul className="menu__list">
                          {userInfo ?
                              <li className="menu__item"><Link to='/signin' className="menu__link" onClick={logoutHandler}>Log out</Link></li>
                              :
                              <li className="menu__item"><Link to='/signin' className="menu__link" >Log in</Link></li>
                          }
                          <li className="menu__item"><Link to='/cart' className="menu__link" >Bag {cartItems.length !== 0 && `(${cartItems.length})`}</Link></li>
                          {userInfo && userInfo.isAdmin && (
                              <div className="dropdown ">
                                  <div className="dropbtn menu__link">Admin</div>
                                  <div className="dropdown-content">
                                      <Link to="/admin/orders">Orders</Link>
                                      <Link to="/admin/products">Products</Link>
                                      <Link to="/admin/categories">Categories</Link>
                                  </div>
                              </div>
                          )}
                      </ul>
                  </nav>
              </div>
          </div>
      </header>
        <>
        <Route path={'/'} exact component={HomePage}/>
        <Route path={'/products'} exact component={ShopPage}/>
        <Route path={'/admin/products'} exact component={AdminProductsPage}/>
        <Route path={'/admin/categories'} exact component={AdminCategoriesPage}/>
        <Route path={'/admin/orders'} exact component={AdminOrdersPage}/>
        <Route path={'/cart'} exact component={CartPage}/>
        <Route path={'/shipping'} exact component={ShippingPage}/>
        <Route path={'/placeorder'} exact component={PlaceOrderPage}/>
        <Route path={'/payment'} exact component={PaymentPage}/>
        <Route path={'/category/:id'} exact component={ShopPage}/>
        <Route path={'/products/:id'} exact component={ProductDetailPage}/>
        <Route path={'/signin'} exact component={SignInPage}/>
        <Route path={'/reset'} exact component={Reset}/>
        <Route path={'/reset/:id'} exact component={NewPassword}/>
        <Route path={'/register'} exact component={RegisterPage}/>
        </>

     <footer className="footer">
         <div className="container">
             <div className="footer__top">
                 <div className="footer__top-title">SIGN UP FOR UPDATES</div>
                 <div className="footer__top-text">Sign up for exclusive early sale access and tailored new arrivals.</div>
                 <div className="footer-form">
                     <form onSubmit={submitHandler}>
                         <input type="email" className="footer-input" placeholder="Your email address"/>
                         <button type="submit" className="footer-top-btn">JOIN</button>
                     </form>
                 </div>
             </div>
             <div className="footer__bottom">
                 <div className="footer-column">
                     <ul className="footer-list">
                         <li className="footer-item footer-link-title">CUSTOMER SERVICE</li>
                         <li className="footer-item"><Link to='/' className="footer-link">CONTACT</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">TRACK ORDER</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">DELIVERY & RETURNS</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">PAYMENT</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">MAKE A RETURN</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">FAQ</Link></li>
                     </ul>
                 </div>
                 <div className="footer-column">
                     <ul className="footer-list">
                         <li className="footer-item footer-link-title">INFO</li>
                         <li className="footer-item"><Link to='/' className="footer-link">GIFT VOUCHERS</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">SIZE GUIDE</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">CAREERS AT MODNIKKY</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">ABOUT US</Link></li>
                         <li className="footer-item"><Link to='/' className="footer-link">LEGAL POLICIES</Link></li>
                     </ul>
                 </div>
                 <div className="footer-column">
                     <ul className="footer-list">
                         <li className="footer-item footer-link-title">FOLLOW US</li>
                         <li className="footer-item"><a href="http://www.facebook.com" className="footer-link footer-icon footer-icon-face">Facebook</a></li>
                         <li className="footer-item"><a href="https://twitter.com" className="footer-link footer-icon footer-icon-odnok">ODNOKLASSNIKI</a></li>
                         <li className="footer-item"><a href="https://www.instagram.com" className="footer-link footer-icon footer-icon-insta">INSTAGRAM</a></li>
                     </ul>
                 </div>
                 <div className="footer-column">
                     <ul className="footer-list">
                         <li className="footer-item footer-link-title">CONTACT US</li>
                         <li className="footer-item"><a href="mailto:hello@modnikky.com" className="footer-link">hello@modnikky.com</a></li>
                         <li className="footer-item"><a href="tel:+791083226" className="footer-link">+7 910 832 26XX</a></li>
                         <li className="footer-item footer-link">Visit us at Shalalaeva 23,Bologoe, Russia</li>
                     </ul>
                 </div>
             </div>
         </div>
     </footer>
    </div>
  );
}

export default App;
