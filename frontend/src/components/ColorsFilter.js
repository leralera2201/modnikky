import React from "react";

const ColorsFilter = ({colors, check, colorHandler}) => {
    return (
        <div className="detail-product__sizes">
        {colors.map(color => {
                return (
                    <div key={color}>
                        <input
                            type="checkbox"
                            name={color}
                            id={color}
                            value={color}
                            checked={check[color]}
                            onChange={colorHandler}
                            className="detail-product__checkbox"
                        />
                        <label
                            htmlFor={color}
                            className="detail-product__label detail-product__label-color"
                            style={{background: '#' + color}}
                        />
                    </div>
                )
            })}
            </div>
    )
}

export default ColorsFilter
