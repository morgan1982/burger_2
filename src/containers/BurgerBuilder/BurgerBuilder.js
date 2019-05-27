import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

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
    purchasing: false
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
    alert('continuing to checkout')
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal show={ this.state.purchasing }
               modalClosed={ this.purchaseCancelHandler }>
          <OrderSummary  ingredients={ this.state.ingredients }
                         purchaseCancel={ this.purchaseCancelHandler }
                         purchaseContinue={ this.purchaseContinueHandler }
                         price={ this.state.total }/>
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
