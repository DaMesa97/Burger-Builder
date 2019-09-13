import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

   state = {
      showSideDrawer: false
   }

   sideDrawerToggleHandler = () => {
      let show = this.state.showSideDrawer
      this.setState({
         showSideDrawer: !show
      })
   }

   render() {
      return (
         <Aux>
            < Toolbar toggle={this.sideDrawerToggleHandler} />
            < SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} />
            <main className={classes.Content}>
               {this.props.children}
            </main>
         </Aux>
      );
   }
}

export default Layout