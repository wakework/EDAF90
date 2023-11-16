import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';

import ComposeSaladWrapper from './ComposeSaladWrapper';
import ViewOrder from './ViewOrder';
import ViewIngredient from './ViewIngredient';

import { Component } from 'react';
import { Route, Link, Routes } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }

    this.addOrder = this.addOrder.bind(this);
  }

  addOrder(salad) {    
    this.setState(state => (
      {orders: [...state.orders, salad]}
    ))

    console.log(this.state);
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
        <Route path="compose-salad" element={<ComposeSaladWrapper inventory={inventory} addOrder={this.addOrder} />} />
        <Route path="view-order" element={<ViewOrder orders={this.state.orders} />} />
        <Route path="view-ingredient/:name" element={<ViewIngredient inventory={inventory} />} />
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
          Kundvagn
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
export default App;