import React from "react";
import propTypes from "prop-types";

class Pizza extends React.Component{

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }

    static propTypes = {
        details: propTypes.shape({
            image: propTypes.string,
            name: propTypes.string,
            price: propTypes.number,
            desc: propTypes.string,
            status: propTypes.string
        }),
        index: propTypes.string,
        addToOrder: propTypes.func
    };
    render(){

        const {image, name, price, desc, status} = this.props.details;

        const isAvailable = status === 'available';
        


        return(
            <li className="menu-pizza">
                <div className="image-container">
                    <img src={image} alt={name}/>
                </div>
                <div className='pizza-details'>
                    <h3 className="pizza-name">
                        {name}
                        <span className="price">{price} zł</span>
                    </h3>
                    <p>{desc}</p>
                    <button 
                    className="buttonOrder" 
                    disabled={!isAvailable}
                    onClick={this.handleClick}
                    >
                        {isAvailable ? 'Order' : 'Unavailable'}
                    </button>
                </div>
            </li>
        );
    }
}

export default Pizza;