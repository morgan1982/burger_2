import React, { Component } from 'react';
import orders, { firebase } from '../../api/order';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

// axios middleware
orders.interceptors.request.use(req => {
  console.log("request", req);
  return req;
}, error => {
  console.log(error);
  return Promise.reject(error);
})  

orders.interceptors.response.use(res => {
  console.log("response", res);
  return res
}, err => {
  console.log(err);
  return Promise.reject(err)
})


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    total: 4,
    purchasable: false,
    purchasing: false,
    id: 0,
    error: null,
    loading: false,
    percentage: 0,
    currentcount: 100,
    intervalId: null
  }

  async componentDidMount() {
    let response;
    try {
      response = await orders.get('/orders')
    } catch(error) {
      this.setState({ error })
    }
    const records = response ? response.data : [];
    let lastId = 0;
    if (records.length) {
      lastId = records[records.length - 1].id;
      console.log("last id", lastId);
    }

    this.setState({ id: lastId })

    let intervalId = setInterval(this.timer, 20);
    this.setState({ intervalId });
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map( key => {
        return ingredients[key] 
      }).reduce( (init, el ) => {
        return init + el;
      }, 0)
      this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients, 
    }
    updatedIngredients[type] = updatedCounted;

    const price = INGREDIENT_PRICES[type];
    const oldPrice = this.state.total;
    const newPrice = price + oldPrice;

    this.setState({ ingredients: updatedIngredients, total: newPrice })
    if (this.state.purchasable === false) {
      this.updatePurchaseState(updatedIngredients);      
    }
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = newCount;
    const oldPrice = this.state.total;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients, total: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const { ingredients, total, id } = this.state
    const order = {
      ingredients,
      price: total.toFixed(2),
      id: id + 1 
    }
    this.setState({ id: order.id })
    orders.post('/orders', { ...order })
      .then( res => console.log(res));
    // todo: close the modal after the order is send
    const fireOrder = {
      ingredients:  this.state.ingredients,
      price: this.state.total,
      customer: {
        name: 'Ziner Philip',
        address: {
          street: 'Test street',
          zipCode: '41352323',
          country: 'Greece'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    firebase.post('/orders.json', fireOrder)
      .then( res => {
        this.setState({ loading: false, purchasing: false })
      })
      .catch( err => {
        this.setState({ loading: false, purchasing: false })
      })
  }

  timer = () => {
    let count = this.state.currentcount -1;
    if (count > 0) {
      this.setState({ currentcount: count })
    } else {
      clearInterval(this.state.intervalId);
    }
  }

  orderSummaryHandler = () => {
    if (this.state.loading) {
      return <ProgressBar percentage={ this.state.currentcount } />
    }
    return (
      <OrderSummary  ingredients={ this.state.ingredients }
      purchaseCancel={ this.purchaseCancelHandler }
      purchaseContinue={ this.purchaseContinueHandler }
      price={ this.state.total }/>
    )
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <ProgressBar percentage={ this.state.currentcount }/>
        <Modal show={ this.state.purchasing }
               modalClosed={ this.purchaseCancelHandler }>
              { this.orderSummaryHandler() }
        </Modal>
        <Burger ingredients={ this.state.ingredients }/>
        <BuildControls ingredientAdded={ this.addIngredientHandler }
                       ingredientRemoved={ this.removeIngredientHandler }
                       disabledInfo={ disabledInfo }
                       price={ this.state.total }
                       purchasable={ this.state.purchasable }
                       ordered={ this.purchaseHandler }
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
