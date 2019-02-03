import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.scss';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [],
    };
  }

  addProduct(prod) {
    this.state.addedProducts.push(prod);
    this.setState({
      addedProducts: this.state.addedProducts,
    })
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ProductRow 
            addProduct={(prod) => this.addProduct(prod)}
            products={this.props.products} 
            fire={firebase}
          />
        </header>
      </div>
    );
  }
}
class ProductRow extends React.Component {
  render() {
    const rows = [];
    this.props.products.forEach((product) => {
      rows.push(
      <ProductItem 
        product={product} 
        addProduct={(product) => this.props.addProduct(product)}/>
    );
    });
    return (
      <div className="shelf-container">{rows}</div>
    )
  }
}

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: this.props.product
    };
    console.log(props);
  }
  handleAddProduct() {
    this.props.addProduct(this.state.prod);
  }

    render() {
      const product = this.props.product;
      return (
      <div
        className="shelf-item"
        data-sku={product.sku}
        onClick={() => this.handleAddProduct()}
      >
        {product.isFreeShipping && (
          <div className="shelf-stopper">Free shipping</div>
        )}
        <ProductPicture
          classes="shelf-item__thumb"
          sku={product.sku}
          alt={product.title}
          title={product.title}
          
        />
        <ProductInfo product = {product}/>
        <div className="shelf-item__buy-btn">Add to cart</div>
      </div>
          
      )
    }
}

class ProductInfo extends React.Component {
  render() {
    const product = this.props.product;
    let formattedPrice = formatPrice(product.price, product.currencyId);
    return (
      <div>
        <p className="shelf-item__title">{product.title}</p>
        <div className="shelf-item__price">
          <div className="val">
            <small>{product.currencyFormat}</small>
            <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
            <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
          </div>
        </div>
      </div>
    );
  }
}

class ProductPicture extends React.Component {
  render() {
    return(
      <div className={this.props.classes}>
        <img 
          src={require(`./static/${this.props.sku}_1.jpg`)}
          alt={this.props.alt} 
          title={this.props.title} />
      </div>
    );
  }
}

function formatPrice(x, currency) {
  switch(currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};
export default App;
