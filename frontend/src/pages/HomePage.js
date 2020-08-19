import React from 'react'
import Collection from "../img/collection.jpg";
import {Link} from "react-router-dom";

const HomePage = () => {
    return(
        <div className="collection" style={{backgroundImage: `url(${Collection})`}}>
            <div className="collection-info">
                <div className="collection-title">
                    NEW COLLECTION
                </div>
                <div className="collection-text">
                    Our easiest chuck-on-and-go staples come with a serious style heritage
                    that’s liberating, sexy, comfy and supremely cool.
                </div>
                <div className="collection-button">
                    <Link to='/products' className='btn'>SHOP NEW ARRIVALS</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
