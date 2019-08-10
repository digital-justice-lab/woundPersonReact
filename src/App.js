import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Viz from './Viz.js'


const PRODUCT_LIST = 'http://dev-woundperson.pantheonsite.io/jsonapi/node/product';
//const DEFAULT_QUERY = 'redux';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [], // get the list of products. this is probably not necessary after refactor.
      // for the barchart.
      data: [12, 5, 6, 6, 9, 10],
      width: 700,
      height: 500,
      id: 'root'
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
  // I made the totally quesionable choice to have this Product component
  // also handle the rendering of the checkbox.  The checkbox itself can be
  // its own component, as seen in the example here:
  // https://react.tips/checkboxes-in-react-16/
  constructor(props) {
    super(props);
    this.state = {
      color: "",
  	  width: "",
  	  toDraw: [],
    };

    // this reacts to when a box is checked.
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // this doesn't work
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // @todo - get it to remember the checked state
    this.setState({
      [name]: value
    });
  }

  onSubmit = (evt) => {
    console.log('in submit');
    evt.preventDefault();
    const newShape = {
      color : 'yellow',
      width : 55,
       // color: this.state.color,
       // width: this.state.width,
    }
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  }

  render() {
    const products = this.props.pdata;
    console.log(products);

    return (
      <div>
      <form onSubmit={this.onSubmit}>

        {products.map(product =>
      <label htmlFor={product.id} key={product.id}>
        {product.attributes.title}
        <input
          name={product.id}
          key={product.id}
          type="checkbox"
          onChange={this.handleInputChange} />
        <br />
      </label>


    )}
    <button type="submit">draw!</button>
    </form>
    <Viz shapes={this.state.toDraw} />
    </div>
  );
  }
}




export default App;
