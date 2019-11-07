import React, { Component } from 'react';
import Title from './Title';

class ProductDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="Product " name2="Details" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
