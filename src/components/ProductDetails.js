import React, { Component } from 'react';
import axios from 'axios';
//import ProductList from './ProductList';
//import Title from './Title';
import { Link } from 'react-router-dom';
import BtnContainer from './Button';
import { Modal, Input } from 'antd';
const { TextArea } = Input;

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      isShowing: false,
      editProduct: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const response = await axios.get('http://localhost:3002/products');
    const { data: { products } = {} } = response;
    this.setState({ products });    
  }

  openModalHandler = () => {
    this.setState({
        isShowing: true
      });
    }

  closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.products.map(product => <li>
            {product.name}
          </li>)}
        </ul>
        <Link to='/'>
        <BtnContainer>
            back to product
        </BtnContainer>
        </Link>
        <BtnContainer onClick={this.openModalHandler} >
            edit product
        </BtnContainer>
        <Modal
                    title="Basic Modal"
                    visible={this.state.isShowing}
                    onOk={this.handleOk}
                    onCancel={this.closeModalHandler}
                >
                    <div>
                        <h3 style={{textAlign:'center'}}>Add Product</h3>
                        <Input style={{width: '80%', margin:'20px'}} placeholder="Enter name" onChange={e => this.onChange('name', e)} />
                        <TextArea style={{width: '80%', margin:'20px'}} autosize={{ minRows: 2, maxRows: 6 }} placeholder="Enter description" onChange={e => this.onChange('description', e)} />
                        <Input style={{width: '80%', margin:'20px'}} placeholder="Enter price" onChange={e => this.onChange('price', e)} />
                        <Input style={{width: '80%', margin:'20px'}} placeholder="Enter image url" onChange={e => this.onChange('imageUrl', e)} />
                        <Input style={{width: '80%', margin:'20px'}} placeholder="Enter rating" onChange={e => this.onChange('rating', e)} />
                    </div>
                </Modal>
      </div>
    );
  }
}

export default ProductDetails;
