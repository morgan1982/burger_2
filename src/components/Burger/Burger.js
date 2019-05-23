import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map( igKey => {
      return [ ...Array(props.ingredients[igKey])]
    } )
  console.log(transformedIngredients);
  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="salad" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
      
    </div>
  )
}

export default Burger;