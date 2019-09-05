import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    let ingredients = Object.keys(props.ingredients).map( // Wykonanie funkcji map dla kazdego klucza obiektu ingredients (meat, salad, cheese, bacon)
        ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => { // Map zwraca tablicę o długości wartości danego klucza (np meat: 3 - map zwraca tablicę o length 3)
                return <BurgerIngredient key={ingredient + i} type={ingredient} /> // Tablica o długości value klucza jest mapowana i pobierany jest z niej index na podstawie którego tworzymy Value-razy komponent dla danego klucza.
            })
        }
    ).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients to the Burger!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;