import React from 'react'
import classes from './Filler.css';

const Filler = props => {
  return (
    <div className={ classes.Filler }
         style={{ width: `${ props.percentage }%` }}></div>
  )
}

export default Filler;