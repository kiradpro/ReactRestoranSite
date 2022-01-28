import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import samplePizzas from "../sample-pizzas";
import Pizza from "./Pizza";
import base from "../base";
import propTypes from "prop-types";
import SignIn from "./Auth/SignIn";
import firebase from "firebase/app";


class App extends React.Component{

    static propTypes = {
        match: propTypes.object
    };

    state = {
        pizzas: {},
        order: {}
    };

    componentDidMount(){
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.restaurantId}/pizzas`,{
            context: this,
            state:'pizzas'
        });
    }

    componentDidUpdate(){
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addPizza = pizza => {
        const pizzas = {...this.state.pizzas};
        
        pizzas[`pizza${Date.now()}`] = pizza;

        this.setState({pizzas});
    }

    updatePizza = (key, updatedPizza) => {
        const pizzas = {...this.state.pizzas};
        pizzas[key] = updatedPizza;
        this.setState({pizzas});
    };

    deletePizza = (key) => {
        const pizzas = {...this.state.pizzas};
        pizzas[key] = null;
        this.setState({pizzas});
    }

    loadSamplePizzas = () => {
        this.setState({pizzas: samplePizzas}); 
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order})
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    handleLogOut = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    };

    render(){
        return(

            <SignIn>
            <div className='tonys-pizza'>
                <div className='menu'>
                    <Header title="Tony's pizza "/>
                    <ul className="pizzas">
                        {Object.keys(this.state.pizzas).map(key => {
                            return (
                            <Pizza 
                            key={key}
                            index={key}
                            addToOrder={this.addToOrder}
                            details={this.state.pizzas[key]}
                            />  
                            );                          
                        })}
                    </ul>
                </div>
                <Order 
                pizzas={this.state.pizzas} 
                order={this.state.order}
                deleteFromOrder={this.deleteFromOrder}
                />
                <MenuAdmin 
                    addPizza = {this.addPizza}
                    loadSamplePizzas={this.loadSamplePizzas}
                    pizzas = {this.state.pizzas}
                    updatePizza = {this.updatePizza}
                    deletePizza={this.deletePizza}
                    handleLogOut={this.handleLogOut}
                />
            </div>
            </SignIn>
        );
    }
}

export default App;