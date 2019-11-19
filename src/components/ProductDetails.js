import React, { Component } from 'react';
import axios from 'axios';
import Title from './Title';
import { Link } from 'react-router-dom';
import './productdetails.css';
import BtnContainer from './Button';
import { Modal, Input } from 'antd';
const { TextArea } = Input;

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product:[],
      isShowing: false,
      editProduct: {}
    };
  }
  
  componentDidMount() {
    this.getProductById();
  }

  getProductById = async () => {
    var x = new URLSearchParams(window.location.search);
    var productId = x.get('id');
    // console.log(productId);
    const response = await axios.get(`http://localhost:3002/products/${productId}`);
    const { data : { product } = {} } = response;
    // console.log(product);
    this.setState({ product });
  }

  deleteProduct = async () => {
    var x = new URLSearchParams(window.location.search);
    var productId = x.get('id');
    const response = await axios.delete(`http://localhost:3002/products/${productId}`);
    console.log(response.data);
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
        <Title name={this.state.product.name} />
        <div className="row">
          <div className="col-6">
            <img className="imageStyle" src={this.state.product.imageUrl} alt="Noimage" />
          </div>
          <div className="col-6">
              <BtnContainer onClick={this.deleteProduct} style={{ background: 'red', marginLeft: "80%", marginBottom: "20%" }}>
                  Delete
              </BtnContainer>
            <p style={{ textAlign: 'center', fontSize: "20px" }}>{this.state.product.description}</p>
            <p style={{ fontSize: "20px", fontWeight: 'bold' }}>Rs.{this.state.product.price}</p>
            <p style={{ fontSize: "20px", fontWeight: 'bold' }}>Rating {this.state.product.rating}</p>
            <Link to='/'>
              <BtnContainer>
                  back to product
              </BtnContainer>
            </Link>
            <BtnContainer onClick={this.openModalHandler} >
                edit product
            </BtnContainer>
          </div>
        </div>
        <Modal
            visible={this.state.isShowing}
            onOk={this.handleOk}
            onCancel={this.closeModalHandler}
        >
          <div>
              <h3 style={{textAlign:'center'}}>Edit Product</h3>
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