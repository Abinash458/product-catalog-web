import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BtnContainer from './Button';
//import AddPostModal from './AddPostModal';
import { Modal, Button, Input } from 'antd';

class Navbar extends Component {
    constructor(){
        super();

        this.state = {
            isShowing: false,
            newProduct: {}
        }
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

    handleOk = () => {
        const { newProduct } = this.state;
        const { onCreate } = this.props;
        this.setState({ isShowing: false }, () => onCreate(newProduct));
    };

  onChange = (key, e) => {
      const { newProduct } = this.state;

      const value = e.target.value;

      this.setState({ newProduct: { ...newProduct, [key]: value } })
  }

    render() {
        return (
            <div>
                <NavWrapper className = "navbar navbar-expand-sm navbar-dark px-sm-5">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-items ml-5">
                            <Link to="/" className="nav-link">
                                product catalog
                            </Link>
                        </li>
                    </ul>
                    <Link to="/" className="ml-auto">
                        <BtnContainer onClick={this.openModalHandler} >
                            add product
                        </BtnContainer>
                    </Link>
                </NavWrapper>
                <Modal
                    title="Basic Modal"
                    visible={this.state.isShowing}
                    onOk={this.handleOk}
                    onCancel={this.closeModalHandler}
                >
                    <div>
                        <h3>Add Product</h3>
                        <Input placeholder="Enter name" onChange={e => this.onChange('name', e)} />
                        <Input placeholder="Enter description" onChange={e => this.onChange('description', e)} />
                        <Input placeholder="Enter price" onChange={e => this.onChange('price', e)} />
                        <Input placeholder="Enter image url" onChange={e => this.onChange('imageUrl', e)} />
                        <Input placeholder="Enter rating" onChange={e => this.onChange('rating', e)} />
                    </div>
                </Modal>
            </div>
            
        );
    }
}

const NavWrapper = styled.nav`
background: #2a2a72;
.nav-link{
    color: #f2f2f2 !important;
    font-size: 1.5rem;
    text-transform:capitalize;
}
`;

export default Navbar;
