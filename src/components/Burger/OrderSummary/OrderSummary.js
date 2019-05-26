import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const { ingredients } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map( key => {
      return (
      <li key={ key }>
        <span style={{ textTransform: 'capitalize' }}>{ key }</span>:
        <div>{ ingredients[key] }</div>
        </li>
      )
    })

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Your burger has</p>
      <ul>
        { ingredientSummary }
      </ul>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" >CANCEL</Button>
      <Button btnType="Success">CONTINUE</Button>
    </React.Fragment>
  )
};

export default orderSummary;

