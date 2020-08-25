import React from "react";

const NotFound = (props) => (
    <div className="container">
        <div className="not-found  pt120">
            <div className="big-number">404</div>
            <div className="not-found-text">Page Not Found. Please, go to home page</div>
            <button className="sign-in-btn" onClick={() => {props.history.push('/')}}>Go home</button>
        </div>
    </div>

)

export default NotFound
