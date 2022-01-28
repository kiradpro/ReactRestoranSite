import React from "react";
import propTypes from "prop-types";

class Shipment extends React.Component {

    static propTypes = {
        total: propTypes.number
    };

    render(){

        const { total } = this.props;
        const shipping = total > 0 && total < 150 ? 25 : 5;
        const shippingNeon = shipping === 5 ? (
            <span className="font-effect-neon total_wrap-cheap">
                {shipping} zł
            </span>
        ): (
            <span>{shipping} zł</span>
        );

        return(
            <div className="total">
                <div className="total_wrap">

                    <div>
                        <div>
                            Delivery: {total > 0 ? shippingNeon : null}
                        </div>
                        <div className="total_wrap-free">
                            {total < 150 ? `Order ${150 - total} zł more for 5 zł delivery` : null}
                        </div>
                    </div>
                    <div className="total_wrap-final">
                        Total: {total} zł
                    </div>
                </div>
            </div>
        );
    };  
};

export default Shipment;