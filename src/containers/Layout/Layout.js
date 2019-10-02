import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'

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
            < Toolbar toggle={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated} />
            < SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated} />
            <main className={classes.Content}>
               {this.props.children}
            </main>
         </Aux>
      );
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)