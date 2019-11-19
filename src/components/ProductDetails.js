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
      // _id:'',
      // name:'',
      // description:'',
      // imgUrl:'',
      // price:'',
      // rating:''
    };
  }
  
  componentDidMount() {
    this.getProductById();
  }

  // componentWillMount() {
  //   this.getProductDetails();
  // }
  

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

  getProductById = async () => {
    var x = new URLSearchParams(window.location.search);
    var productId = x.get('id');
    // console.log(productId);
    const response = await axios.get(`http://localhost:3002/products/${productId}`);
    const { data : { product } = {} } = response;
    // console.log(product);
    this.setState({ product });
  }

  deleteProduct(){
    var x = new URLSearchParams(window.location.search);
    var productId = x.get('id');
    axios.delete(`http://localhost:3002/products/${productId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  // getProductDetails() {
  //   var x = new URLSearchParams(window.location.search);
  //   var productId = x.get('id');
  //   axios.get(`http://localhost:3002/products/${productId}`)
  //   .then(response => {
  //     this.setState({
  //       _id: response.data._id,
  //       name: response.data.name,
  //       description: response.data.description,
  //       imgUrl: response.data.imgUrl,
  //       price: response.data.price,
  //       rating: response.data.rating
  //     }, () => {
  //       console.log(this.state);
  //     });
  //   })
  //   .catch(err => console.log(err));
  // }

  // onSubmit(e) {
  //   const newProduct = {
  //     name: this.refs.name.value,
  //     description: this.refs.description.value,
  //     imgUrl: this.refs.imgUrl.value,
  //     price: this.refs.price.value,
  //     rating: this.refs.rating.value
  //   }
  //   this.editProduct(newProduct);
  //   e.preventDefault();
  // }

  render() {
    return (
      <div>
        <Title name={this.state.product.name} />
        <div className="row">
          <div className="col-6">
            <img className="imageStyle" src={this.state.product.imageUrl} alt="Noimage" />
          </div>
          <div className="col-6">
              <BtnContainer onClick={this.deleteProduct.bind(this)} style={{ background: 'red', marginLeft: "80%", marginBottom: "20%" }}>
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
              {/* <form onSubmit={this.onSubmit.bind(this)}> */}
              <Input style={{width: '80%', margin:'20px'}} name="name" ref="name" placeholder="Enter name" />
              <TextArea style={{width: '80%', margin:'20px'}} autosize={{ minRows: 2, maxRows: 6 }} name="description" ref="description" placeholder="Enter description" />
              <Input style={{width: '80%', margin:'20px'}} name="price" ref="price" placeholder="Enter price" />
              <Input style={{width: '80%', margin:'20px'}} name="imgUrl" ref="imgUrl" placeholder="Enter image url" />
              <Input style={{width: '80%', margin:'20px'}} name="rating" ref="rating" placeholder="Enter rating" />
              {/* </form> */}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ProductDetails;