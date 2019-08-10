import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const PRODUCT_LIST = 'http://dev-woundperson.pantheonsite.io/jsonapi/node/product';
//const DEFAULT_QUERY = 'redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // get the list of products. this is probably not necessary after refactor.
    };
  }

  componentDidMount() {
    fetch(PRODUCT_LIST)
      .then(response => response.json())
      // its data.data because of the day drupal formats the json response
      .then(data => this.setState({ products: data.data }));
  }



  render () {
    const { products } = this.state;
    return(

    <div className="App">
      <header className="App-header">
        {//render the product component
        }
        <Product pdata={products}/>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This might have the wound person
        </p>
      </header>
    </div>

    );
  }
}




class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    // this reacts to when a box is checked.
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const products = this.props.pdata;
    console.log(products);

    return (
      <form>

      {products.map(product =>
      <label htmlFor={product.id}>
        {product.attributes.title}
        <input
          name={product.id}
          key={product.id}
          type="checkbox"
          onChange={this.handleInputChange} />
        <br />
      </label>


    )}

    </form>
  );
  }
}




export default App;
