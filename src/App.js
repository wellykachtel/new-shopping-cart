import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.scss';
import firebase from './firebase';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [],
      isOpen: false,
    };
    this.handleDrawer= this.handleDrawer.bind(this);
  }

  addProduct(prod) {
    this.state.addedProducts.push(prod);
    this.setState({
      addedProducts: this.state.addedProducts,
    })
    console.log(this.state);
  }

  handleDrawer() {
    console.log(this.state);
    this.setState({
      isOpen: !this.state.isOpen
    });
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <IconButton aria-label="Cart" onClick={this.handleDrawer}>
            <Badge className="shopping-icon" badgeContent={this.state.addedProducts.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <ProductRow 
            addProduct={(prod) => this.addProduct(prod)}
            products={this.props.products} 
            fire={firebase}
          />
          <ShoppingCart
           open={this.state.isOpen} 
           productList={this.state.addedProducts}
           handleDrawer={() => this.handleDrawer()} />
        </header>
      </div>
    );
  }
}

class ShoppingCart extends React.Component {

  render() {
    let productList = this.props.productList
    let sideList = (
      <div>
        <List>
          {productList.map((item) => (
            <ListItem>
              <SideListProduct
                prod={item}
                />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          Cart Total: $ 100.00
        </List>
      </div>
    );
    return (
      <Drawer anchor="right" open={this.props.open} onClose={this.props.handleDrawer}>
      <div
        tabIndex={0}
        role="button"
        onClick={this.props.handleDrawer}
        onKeyDown={this.props.handleDrawer}
      >
        {sideList}
      </div>
    </Drawer>
    );
  }
}

class SideListProduct extends React.Component {
  render() {
    let product = this.props.prod;
    return(
      <Grid container spacing={16}>
          <Grid item>
            <ButtonBase>
            <img 
              src={require(`./static/${product.sku}_1.jpg`)}
              alt={product.title} 
              title={product.title} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
                <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
                <Typography color="textSecondary">ID: 1030114</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
      </Grid>
        
    )
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
