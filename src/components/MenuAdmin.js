import React from "react";
import AddPizzaForm from "./AddPizzaForm";
import EditPizzaForm from "./EditPizzaForm";
import propTypes from "prop-types";
import firebase from "firebase/app";



class MenuAdmin extends React.Component{

    state = {
        photo: '',
        user: ''
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            };
        });
    };

    authHandler = async authData =>{
        const { email, photoURL } = authData.user;
        this.setState({ user: email, photo: photoURL });
    };

    static propTypes = {
        pizzas: propTypes.object,
        deletePizza: propTypes.func,
        updatePizza: propTypes.func,
        addPizza: propTypes.func,
        loadSamplePizzas: propTypes.func 
    };

    render(){

        const {user, photo} = this.state;
        const avatar = photo ? photo : "/images/avatar.png"; 

        return(
            <div className="menu-admin">
                {user ? (
                <div className="login-header">
                    <div className="avatar">
                        <img src={avatar} alt={user}/>
                    </div>
                    <button className="buttonLogout" onClick={this.props.handleLogOut}>Log out</button>
                </div>
                ) : null}
                <h2>Menu Administration</h2>
                {Object.keys(this.props.pizzas).map(key => {
                    return <EditPizzaForm 
                    key={key} 
                    index={key}
                    deletePizza={this.props.deletePizza}
                    pizza={this.props.pizzas[key]} 
                    updatePizza={this.props.updatePizza}
                    />
                })}
                <AddPizzaForm addPizza={this.props.addPizza}/>
                <button onClick={this.props.loadSamplePizzas}>Load Pizzas</button>
            </div>
        );
    }
}

export default MenuAdmin;