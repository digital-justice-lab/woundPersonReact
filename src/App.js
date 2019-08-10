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

  // this renders one product checkbox?
  // or maybe all of them? idkkk.
  renderProductCheckbox() {
    return (
      <Product />
    );
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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
    {products.map(product =>
      <li value={product.attributes.title}>
        <a href={product.attributes.field_url.uri}>{product.attributes.title}</a>
      </li>
    )};


      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}




export default App;
