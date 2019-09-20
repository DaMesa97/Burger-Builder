import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
   const ingredients = []

   for (let ingredientName in props.ingredients) {
      ingredients.push({ name: ingredientName, ammount: props.ingredients[ingredientName] })
   }

   const ingredientOutput = ingredients.map(ig => {
      return <span style={{
         textTransform: 'capitalize',
         display: 'inline-block',
         margin: '0 8px',
         border: '1px solid grey',
         padding: '5px'
      }}
         key={ig.name}>{ig.name}: {ig.ammount} </span>
   })

   return (
      <div className={classes.Order}>
         <p>Your burger with: {ingredientOutput}</p>
         <p>Total price: <strong>{Math.floor(props.price * 100) / 100}$</strong></p>
      </div>
   );
}

export default order