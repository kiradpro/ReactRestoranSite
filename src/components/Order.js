import React from "react";
import Shipment from "./Shipment";
import { TransitionGroup, CSSTransition} from 'react-transition-group';
import propTypes from "prop-types";

class Order extends React.Component{

    static propTypes = {
        pizzas: propTypes.object,
        order: propTypes.object,
        deleteFromOrder: propTypes.func
    };

    renderOrder = (key) => {

        const pizza = this.props.pizzas[key];
        const count = this.props.order[key];
        const isAvailable = pizza && pizza.status === 'available';
        const transitionOptions = {
            classNames: 'order',
            key,
            timeout: {enter: 500, exit: 500}
        }

        if(!pizza) return null;

        if(!isAvailable){
            return (
            <CSSTransition {...transitionOptions}>
                <li className="unavailable" key={key}>
                    Sorry, {pizza ? pizza.name : 'pizza'} temporarely unavailable
                </li>
            </CSSTransition>
            );
        };

        return (
        <CSSTransition {...transitionOptions}>
            <li key={key}>
                <span>
                    <TransitionGroup component='span' className='count'>
                        <CSSTransition classNames='count' key={count} timeout={{enter: 500, exit: 500}}>
                            <span>{count} </span>
                        </CSSTransition>
                    </TransitionGroup>
                     {pizza.name}
                    <span> {count * pizza.price} zł</span>
                    <button 
                    onClick={() => this.props.deleteFromOrder(key)} 
                    className="cancelItem">
                        &times;
                    </button>
                    
                </span>
            </li>
        </CSSTransition>
        );
    };
    render(){
        const orderIds = Object.keys(this.props.order)
        const total = orderIds.reduce((prevTotal, key) => {
            const pizza = this.props.pizzas[key];
            const count = this.props.order[key];

            const isAvailable = pizza && pizza.status === 'available';
            if(isAvailable){
                return prevTotal + pizza.price * count;
            }

            return prevTotal;
            
        }, 0);

        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup component='ul' className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                
                {total > 0 ? (
                    <Shipment total={total}/>
                ) : (
                    <div className="nothingSelected">
                        Choose a pizza and add it to order
                    </div>
                )}

            </div>
        );
    }
}

export default Order;