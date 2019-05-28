import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
  showIngredients = () => {
    const { ingredients } = this.props;
    return Object.keys(ingredients)
      .map( key => {
        return (
        <li key={ key }>
          <span style={{ textTransform: 'capitalize' }}>{ key }</span>:
          <div>{ ingredients[key] }</div>
        </li>
        )
      })  
  } 

  componentDidMount() {
    console.log('component mounted');
  }

  render() {
    console.log('inside render');
      return (
        <React.Fragment>
          <h3>Your Order</h3>
          <p>Your burger has</p>
          <ul>
            { this.showIngredients() }
          </ul>
          <p><strong>Total price is: { this.props.price.toFixed(2) }</strong></p>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger"
                  clicked={ this.props.purchaseCancel } >CANCEL</Button>
          <Button btnType="Success"
                  clicked={ this.props.purchaseContinue }>CONTINUE</Button>
        </React.Fragment>
      )
  }
};

export default orderSummary;

