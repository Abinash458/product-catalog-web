import React, { Component } from 'react';
//import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BtnContainer from './Button'
import { Card } from 'antd';

class Product extends Component {
    render() {
        const { product: { _id, name, imageUrl, rating, price} = {} } = this.props;
        return (
            <div style={{ width: '30%', padding: 10, marginright: 10 }}>
                <Card>
                    <div style={{ display: 'flex' }}>
                        <img src={imageUrl} alt="Noimage" style={{ height: 100, width: 100 }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5>{name}</h5>
                            <strong>rating: {rating}</strong>
                            <h6><strong>Rs. {price}</strong></h6>
                        </div>
                    </div>
                    <Link to={`/details?id=${_id}`}>
                        <BtnContainer style={{ fontSize: 'small'}}>
                            Learn More
                        </BtnContainer> 
                    </Link>
                </Card>
            </div>
        );
    }
}


export default Product;
