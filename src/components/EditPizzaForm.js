import React from "react";
import propTypes from "prop-types";

class EditPizzaForm extends React.Component{

    static propTypes = {
        pizza: propTypes.shape({
            image: propTypes.string,
            name: propTypes.string,
            price: propTypes.number,
            desc: propTypes.string,
            status: propTypes.string
        }),
        index: propTypes.string,
        updatePizza: propTypes.func,
        deletePizza: propTypes.func
    };

    handleChange = (event) => {
        const updatedPizza = {
            ...this.props.pizza,
            [event.currentTarget.name]: event.currentTarget.name === 'price' 
            ? parseFloat(event.currentTarget.value) || 0
            : event.currentTarget.value
        };

        this.props.updatePizza(this.props.index, updatedPizza);
    };



    render(){
        return(
            <div className="pizza-edit">
                <input onChange={this.handleChange} name = 'name' type='text' value={this.props.pizza.name}/>
                <input onChange={this.handleChange} name = 'price' type='text' value={this.props.pizza.price}/>
                <select onChange={this.handleChange} name = 'status' className='status' value={this.props.pizza.status}>
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                </select>
                <textarea onChange={this.handleChange} name = 'desc' value={this.props.pizza.desc}/>
                <input onChange={this.handleChange} name = 'image' type='text' value={this.props.pizza.image}/>
                <button onClick={() => this.props.deletePizza(this.props.index)}>
                    Delete from menu
                </button>
            </div>
        );
    };
};

export default EditPizzaForm;