import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data
        this.setState({ products: docs, productInfo, page });
    };

    nextPage = async () => {
        const { page, productInfo } = this.state;
        if(page === productInfo.pages) return;
        
        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    prevPage = async () => {
        const { page, productInfo } = this.state;
        if(page === 1) return;
        const pageNumber = page -1;

        this.loadProducts(pageNumber);
    }


    render() {
        const { products, page, productInfo } = this.state;
    return (
    <div className="product-list">{products.map(item => (
    <article key={item._id}>
    <strong>{item.title}</strong>
    <p>{item.description}</p>
    <Link to={`/product/${item._id}`}>Acessar</Link>
    </article>
    ))}
    <div className="actions">
        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
        <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
    </div>
    </div>
    );
    }
}