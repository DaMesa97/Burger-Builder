import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spiner/Spiner'

class ContactData extends Component {
   state = {
      name: null,
      email: null,
      adress: {
         postCode: null,
         street: null
      },
      deliveryMethod: null,
      loading: false
   }

   orderHandler = (e) => {
      e.preventDefault();
      console.log(this.props)
      this.setState({
         loading: true
      })
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         customer: {
            name: 'Tymoteusz Weglorz',
            adress: {
               city: 'Edinburgh',
               street: 'Picardy Place 16-22',
               postCode: 'EH1 3JT',
               country: 'Scotland'
            },
            email: 'test@test.com',
         },
         deliveryMethod: 'fastest'
      }
      axios.post('orders.json', order)
         .then(response => {
            this.setState({ loading: false });
            this.props.history.replace('/')
         })
         .catch(error => {
            this.setState({ loading: false })
         })
   }
   render() {
      let form = (
         <form>
            <input className={classes.Input} type='text' name="name" placeholder="Your name" />
            <input className={classes.Input} type='email' name="email" placeholder="Your email" />
            <input className={classes.Input} type='text' name="street" placeholder="Your street" />
            <input className={classes.Input} type='text' name="postCode" placeholder="Your post code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order!</Button>
         </form>
      );
      if (this.state.loading) {
         form = < Spinner />
      }
      return (
         <div className={classes.ContactData}>
            <h4>Fill your contact form</h4>
            {form}
         </div>
      );
   }
}

export default withRouter(ContactData)