import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
   return (
      <ul className={classes.NavigationItems}>
         <NavigationItem link='/'>Burger Builder</NavigationItem>
         {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
         {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/authentication">Log in/Register</NavigationItem>}
      </ul>
   );
}

export default navigationItems