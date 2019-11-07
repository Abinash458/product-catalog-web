import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

class Product extends Component {
    render() {
        const { product: { name, imageUrl, price} = {} } = this.props;
        return (
            <div style={{ width: '30%', padding: 10, marginright: 10 }}>
                <Card>
                    <div style={{ display: 'flex' }}>
                        <img src={imageUrl} style={{ height: 100, width: 100 }} alt='No image' />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h5>{name}</h5>
                            <h6><strong>Rs. {price}</strong></h6>
                        </div>
                        
                    </div>
                </Card>
            </div>

        );
    }
}

export default Product;