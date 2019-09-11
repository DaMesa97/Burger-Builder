import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
   return (
      <header className={classes.Toolbar}>
         <div onClick={props.opened}>MENU</div>
         < Logo height="80%" margin="32px" />
         <nav className={classes.DesktopOnly}>
            <NavigationItems />
         </nav>
      </header>
   );
}

export default toolbar