import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import "antd/dist/antd.css";

class App extends Component {
  state = {
    newProduct: {}
  }
  render() {
    const { newProduct } = this.state;
    return (
      <React.Fragment>
        <Navbar onCreate={(product) => this.setState({ newProduct: product })} />
        <Switch>
          <Route exact path='/' component={() => <ProductList newProduct={newProduct} /> } />
          <Route path='/details' component={ProductDetails} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
