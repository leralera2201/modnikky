import React from "react";
import InputRange from "react-input-range";

const PriceFilter = ({priceHandler, value}) => {
    return (
        <div style={{marginLeft: '30px'}}>
            <InputRange
                draggableTrack
                onChange={priceHandler}
                minValue={0}
                value={value}
                maxValue={2000}
            />
        </div>
    )
}

export default PriceFilter
