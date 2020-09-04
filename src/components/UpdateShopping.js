import React, { Component } from 'react';
import ShopDataService from '../services/shop.service';

class UpdateShopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShop: {
        id: '',
        name: '',
        amount: ''
      },
      message: '',
    };
    this.getShop = this.getShop.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.deleteShop = this.deleteShop.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentWillMount() {
    this.getShop(this.props.match.params.id);
  }
  onChangeName(e) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentShop: {
          ...prevState.currentShop,
          name: name
        }
      };
    });
  }
  onChangeAmount(e) {
    const amount = e.target.value;
    this.setState(function (prevState) {
      return {
        currentShop: {
          ...prevState.currentShop,
          amount: amount
        }
      };
    });
  }
  getShop(id) {
    ShopDataService.get(id)
      .then(response => {
        this.setState({
          currentShop: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateShop() {
    ShopDataService.update(
      this.state.currentShop.id,
      this.state.currentShop
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Shop updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteShop() {
    ShopDataService.delete(this.state.currentShop.id)
      .then(res => {
        this.setState({
          message: 'Shop deleted Successfully',
          currentShop: {
            name: '',
            amount: ''
          }
        })
        console.log('delete shop', res.data);
        // this.props.history.push('/recipes')
      })
      .catch(e => {
        console.log(e.res);
      });
  }

  handleClear() {
    this.setState({
      currentShop: {
        name: '',
        amount: ''
      }
    });
  }

  render() {
    const { currentShop } = this.state;
    return (
      <div>
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
            onClick={this.updateShop}
          >
            Update
                </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.deleteShop}
          >
            Delete
                    </button>

          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={this.handleClear}
          >
            Clear
                </button>

        </div>
        <h4><center>{this.state.message}</center></h4>
      </div>
    )
  }
}
export default UpdateShopping;