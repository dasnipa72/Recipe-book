import React, { Component } from 'react';
import ShopDataService from '../services/shop.service';
import { Link } from 'react-router-dom';

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoplist: [],
      currentShop: [],
      name: '',
      amount: '',
      currentIndex: -1,
      errors: {}
    }
    this.handleClear = this.handleClear.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.retrieveShopLists = this.retrieveShopLists.bind(this);
    this.setActiveShops = this.setActiveShops.bind(this);
    this.addShop = this.addShop.bind(this);
  }

  componentWillMount() {
    this.retrieveShopLists();
  }
  componentDidUpdate() {
    this.retrieveShopLists();
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }
  submitForm(e) {
    // e.preventDefault();
    if (this.validateForm()) {
      this.setState({
        name: '',
        amount: ''
      });
      alert("Shoplist added");
    }
  }
  validateForm() {
    let errors = {};
    let formValid = true;

    if (!this.state.name) {
      formValid = false;
      errors["nameError"] = "Name Cann't be null";
    }
    if (typeof this.state.name !== 'undefined') {
      if (!this.state.name.match(/^[a-zA-Z]*$/)) {
        formValid = false;
        errors["nameError"] = "Please enter alphabet character only";
      }
    }
    if (!this.state.amount) {
      formValid = false;
      errors["amountError"] = "amount Cann't be null";
    }
    if (typeof this.state.amount !== 'undefined') {
      if (!this.state.name.match(/^[0-9]*$/)) {
        formValid = false;
        errors["nameError"] = "Please enter numbers only";
      }
    }
    this.setState({
      errors: errors
    });

    return formValid;
  }

  handleClear() {
    this.setState({
      currentShop: {
        name: '',
        amount: ''
      }
    });
  }
  setActiveShops(shop, index) {
    this.setState({
      currentShop: shop,
      currentIndex: index
    });
    // console.log('current shop', this.state.currentShop, this.state.currentIndex);
    // console.log('current shop id', this.state.currentShop.id);
  }

  retrieveShopLists() {
    ShopDataService.getAll()
      .then(res => {
        this.setState({
          shoplist: res.data,
        });
        console.log(res.data);
      })
      .catch(e => { console.log(e); });
    console.log('kuch nhi aya', this.state.shoplist);
  }

  addShop() {
    var data = {
      name: this.state.name,
      amount: this.state.amount,
    }
    const isValid = this.submitForm();
    ShopDataService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          amount: res.data.amount

        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { shoplist, currentIndex, currentShop } = this.state;
    // const {shoplist}=this.props;

    return (
      <div>
        <form></form>
        <div className="list row">
          <div className="col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={currentShop.name}
              onChange={this.onChangeName}
              name="name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="amount">Amount </label>
            <input
              type="integer"
              className="form-control"
              id="amount"
              required
              value={currentShop.amount}
              onChange={this.onChangeAmount}
              name="amount"
            />
          </div>
        </div>
        <div className="list row">
          <button
            className="m-3 btn btn-sm btn-success"
            onClick={this.addShop}
          >
            Add
          </button>

          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={this.handleClear}
          >
            Clear
            </button>
        </div>

        <div className="list row">
          <ul className="list-group">
            {shoplist &&
              shoplist.map((shop, index) => (
                <li
                  className={
                    "list-group-item" +
                    (index === currentIndex ? "active" : "")
                  }
                  onFocus={() => this.setActiveShops(shop, index)}
                  key={index}
                >
                  <Link to={"/shop/" + currentShop.id}>
                    {shop.name} ({shop.amount})    <br />

                  </Link>
                </li>
              ))}
          </ul>
        </div>

      </div>
    )
  }
}
export default Shopping;