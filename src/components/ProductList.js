import React, { Component } from 'react';
//import HttpService from '../services/HttpService';
import Product from './Product';
import Title from './Title';
import axios from 'axios';

// const http = new HttpService();

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products:[]
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { newProduct: prevProduct } = prevProps;
    const { newProduct } = this.props;
    const { products } = this.state;

    if (newProduct && newProduct.name !== prevProduct.name ) {
      this.setState({
        products: [ ...products, newProduct ]
      })
    }
  }

  //returning the promise
  loadData = async () => {
    const response = await axios.get('http://localhost:3002/products');
    const { data: { products } = {} } = response;
    this.setState({ products });
  }

  //returning multiple data
  listProduct = () => {
    const { products = [] } = this.state;
    const list = products.map((product) =>  <Product product={product} key={product._id} />);
    return (list);
  }

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Product " name2="Catalog" />
              <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center' }}>
                {this.listProduct()}
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;