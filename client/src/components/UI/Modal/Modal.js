import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const areEqual = (prevProps, nextProps) => {
  return prevProps.show === nextProps.show && prevProps.children === nextProps.children
} 

const modal = props => (
  <React.Fragment>
    <Backdrop show={ props.show }
              clicked={ props.modalClosed } />
    <div className={ classes.Modal }
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
      { props.children }
    </div>
  </React.Fragment>
);

export default React.memo(modal, areEqual);