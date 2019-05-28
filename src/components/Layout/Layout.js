import React, { Component } from 'react';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {
  state = {
    show: false
  }

  SideDrawerClosedHandler = () => {
    this.setState({ show: false })
  }

  SideDrawerToggleHandler = () => {
    this.setState( prevState => {
      return { show: !prevState.show }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar clicked={ this.SideDrawerToggleHandler}/>
        <SideDrawer open={ this.state.show }
                    closed={ this.SideDrawerClosedHandler }/>
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </React.Fragment>
    )
  }
}

export default layout;