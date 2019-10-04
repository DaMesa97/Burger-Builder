import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Meat', type: 'meat' },
   { label: 'Cheese', type: 'cheese' }
]

const buildControls = (props) => {
   return (
      <div className={classes.BuildControls}>
         <p>Current price: <strong>{Math.floor(props.price * 100) / 100}$</strong></p>
         {controls.map(control => {
            return <BuildControl key={control.label}
               label={control.label}
               added={() => props.ingredientAdded(control.type)}
               removed={() => props.ingredientRemoved(control.type)}
               disabled={props.disabled[control.type]} />
         })}
         <button disabled={!props.purchaseable}
            className={classes.OrderButton}
            onClick={props.ordered}>{props.isAuth ? `Order now!` : `Log in to order!`}</button>
      </div>
   );
}

export default buildControls