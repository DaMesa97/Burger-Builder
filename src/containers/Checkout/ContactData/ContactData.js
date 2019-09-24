import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spiner/Spiner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your street'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         postCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Post Code'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6,
               maxLength: 8
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your email adress'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [{
                  value: 'fastest', displayValue: 'Fastest'
               },
               {
                  value: 'cheapest', displayValue: 'Cheapest'
               }]
            },
            validation: {
               required: false
            },
            value: 'fastest',
            valid: true
         }
      },
      formIsValid: false,
      loading: false
   }

   orderHandler = (e) => {
      e.preventDefault();
      this.setState({
         loading: true
      })
      let formData = {};
      for (let formElementId in this.state.orderForm) {
         formData[formElementId] = this.state.orderForm[formElementId].value;
      }
      console.log(formData, this.state.orderForm)
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         customerData: formData
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

   checkValidation = (value, rules) => {
      let isValid = true;

      if (rules.required) {
         isValid = value.trim() !== "" && isValid
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid
      }

      return isValid;
   }

   inputChangedHandler = (e, inputId) => {
      const updatedOrderForm = {
         ...this.state.orderForm
      }

      const updatedFormElement = {
         ...updatedOrderForm[inputId]
      }

      updatedFormElement.value = e.target.value
      updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true
      updatedOrderForm[inputId] = updatedFormElement

      let formIsValid = true;

      for (let inputId in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputId].valid && formIsValid
      }

      this.setState({
         orderForm: updatedOrderForm,
         formIsValid: formIsValid
      })
   }

   render() {
      const formElementsArray = [];

      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
         })
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map(el => {
               return (
                  <Input elementType={el.config.elementType}
                     elementConfig={el.config.elementConfig}
                     value={el.config.value}
                     key={el.id}
                     invalid={!el.config.valid}
                     shouldValidate={el.config.validation}
                     touched={el.config.touched}
                     changed={(e) => this.inputChangedHandler(e, el.id)} />
               )
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order!</Button>
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