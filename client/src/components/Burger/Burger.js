import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map( incredient => {
      return [ ...Array(props.ingredients[incredient])].map( ( _, i ) => {
        return <BurgerIngredient type={ incredient } key={ incredient + i }/>
      })
    } ).reduce(( arr, el ) => {
      return arr.concat(el)
    }, [])
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <div>Add some tasty ingredients</div>
  }


  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type="bread-top" />
        { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
      
    </div>
  )
}

export default Burger;