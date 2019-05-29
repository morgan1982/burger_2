import React from 'react'
import classes from './ProgressBar.css';

import Filler from './Filler/Filler';

const ProgressBar = props => {
  return (
    <div className={ classes.ProgressBar }>
      <Filler percentage={ props.percentage }/>
    </div>
  )
}

export default ProgressBar;