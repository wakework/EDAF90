import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import ComposeSaladWrapper from './ComposeSaladWrapper';
import ViewIngredient from './ViewIngredient';
import OrderConfirmation from './OrderConfirmation';

import { Component } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import ViewOrderWrapper from './ViewOrderWrapper';
import Salad from './Salad.ES6';

class App extends Component {
  constructor(props) {
    super(props);

    const salad = window.localStorage.getItem("order");

    this.state = {
      orders: [], 
      inventory: {}, 
      confirmation: []
    };

    if (salad) {
      this.state.orders = JSON.parse(salad).map(s => {
        let keys = Object.keys(s.inv);
        let values = Object.values(s.inv);
        console.log();
        const salad = new Salad();

        for (let i = 0; i < keys.length; i++) {
          console.log(keys[i]);
          salad.add(keys[i], values[i]);
        }
        console.log(salad.inv);
        return salad;
      })
    }    

    this.addOrder = this.addOrder.bind(this);
    this.addConfirmation = this.addConfirmation.bind(this);
  }

  addOrder(salad) {
    window.localStorage.setItem("order", JSON.stringify([...this.state.orders, salad]));

    this.setState(state => (
      {orders: [...state.orders, salad]}
    ));
  }

  addConfirmation(salad) {
    this.setState(
      {confirmation: [ salad ]}
    );
  }

  componentDidMount() {
    let components = ["foundations", "proteins", "extras", "dressings"];
    let inventory = {};

    Promise.all(components.map(async com => {
      const ing = await fetchIngredient(com);
      await Promise.all(ing.map(async i => {
        const ingr = await fetchIngredient(com + "/" + i);
        return inventory[i] = ingr;
      }));
      this.setState({ inventory });
    }))
  }

  render() {
    return (
      <div className="container py-4">
        <Header />
        <Navbar />
        {this.renderRouter()}
        <Footer />
      </div>
    );
  }

  renderRouter() {
    return (
      <Routes>
        <Route path="" element={
          <div className="continer col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
              <h1>Välkommen till Stellas Salladsbar!</h1>
              </div>
          </div>
          } />
        <Route path="compose-salad" element={<ComposeSaladWrapper inventory={this.state.inventory} addOrder={this.addOrder} />} />
        <Route path="view-order" element={<ViewOrderWrapper orders={this.state.orders} confirmation={this.addConfirmation} />} />
        <Route path="view-ingredient/:name" element={<ViewIngredient inventory={this.state.inventory} />} />
        <Route path="order-confirmation" element={<OrderConfirmation confirmation={this.state.confirmation} />} />
        <Route path="*" element={<h1>PAGE NOT FOUND 404</h1>} />
      </Routes>
    );
  }
}

function Header() {
  return(
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <Link className="nav-link" aria-current="page" to="">
          Hem
        </Link>
      </li>
      <li className="nav-item" role="presentation">
        <Link className="nav-link" aria-current="page" to="/compose-salad">
          Komponera en sallad
        </Link>
      </li>
      <li className="nav-item" role="presentation">
        <Link className="nav-link" aria-current="page" to="/view-order">
          Varukorg
        </Link>
      </li>
      <li className="nav-item" role="presentation">
        <Link className="nav-link" aria-current="page" to="/order-confirmation">
          Beställningar
        </Link>
      </li>
    </ul>
  );
}

function Footer() {
  return(
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

function fetchIngredient(ingrName) {
  let server = "http://localhost:8080/";
  return safeFetchJson(server + ingrName);
}

async function safeFetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(url + 'returned status' + response.status);
  }
  return await response.json();
}
export default App;