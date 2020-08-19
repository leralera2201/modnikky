import React from "react";
import {Link} from "react-router-dom";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";
import ColorsFilter from "./ColorsFilter";

const Categories = (props) => {

    return (
        <div className="category">
            <div className="category__title">Categories</div>
            <ul className="category__list">
                <li className="category__item">
                    <Link to={'/products'} className="category__link">All</Link>
                </li>
                {props.categories.map(category => (
                    <li className="category__item" key={category}>
                        <Link to={'/category/' + category.toLowerCase()} className="category__link">{category}</Link>
                    </li>
                ))}
            </ul>
            <div className="category__title">Filters</div>
            <div className="block one">
            <div className="block__item">
                <div className="category-subtitle" onClick={props.filterHandler}>Price</div>
                <form className="category-form category-form-price">
                  <PriceFilter priceHandler={props.priceHandler} value={props.value}/>
                </form>
            </div>
            <div className="block__item ">
                <div className="category-subtitle" onClick={props.filterHandler}>Size</div>
                <div className="category-form size-block">
                    <SizeFilter sizes={props.sizes} check={props.check} sizeHandler={props.sizeHandler}/>
                </div>
            </div>
            <div className="block__item">
                    <div className="category-subtitle" onClick={props.filterHandler}>Color</div>
                    <div className="category-form color-select" style={{marginLeft: '15px'}}>
                        {/*<SizeFilter sizes={colors} check={colorCheck} sizeHandler={colorHandler}/>*/}
                        <ColorsFilter colors={props.colors} check={props.colorCheck} colorHandler={props.colorHandler}/>
                        {/*<ColorSelect colorHandler={colorHandler}/>*/}
                    </div>

                </div>
            <button className="sign-in-btn result-btn" onClick={props.getResult}>Find</button>
            </div>

        </div>
    )
}


export default Categories
