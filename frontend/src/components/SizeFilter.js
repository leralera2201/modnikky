import React from "react";

const SizeFilter = ({sizes, check, sizeHandler}) => {

    return (
        <div className="detail-product__sizes">
        {sizes.map(size => {
                return (
                    <div key={size}>
                        <input
                            type="checkbox"
                            name={size}
                            id={size}
                            value={size}
                            checked={check[size]}
                            onChange={sizeHandler}
                            className="detail-product__checkbox"
                        />
                        <label
                            htmlFor={size}
                            className="detail-product__label detail-product__label-size"
                        >{size}</label>
                    </div>
                )
            })}
            </div>
    )
}

export default SizeFilter
