import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Authentication.module.css'

class Authentication extends Component {
   state = {
      authForm: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Email adress'
            },
            value: '',
            validation: {
               required: true,
               isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignUp: true
   }

   checkValidity = (value, rules) => {
      let isValid = true;
      if (!rules) {
         return true;
      }
      if (rules.required) {
         isValid = value.trim() !== "" && isValid;
      }
      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }
      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
      }
      if (rules.isEmail) {
         const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         isValid = pattern.test(value.toLowerCase()) && isValid;
      }

      return isValid;
   }

   inputChangedHandler = (e, controlName) => {
      const updatedAuth = {
         ...this.state.authForm,
         [controlName]: {
            ...this.state.authForm[controlName],
            value: e.target.value,
            valid: this.checkValidity(e.target.value, this.state.authForm[controlName].validation),
            touched: true
         }
      }
      this.setState({
         authForm: updatedAuth
      })
   }

   submitHandler = (e) => {
      e.preventDefault();
      this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp)
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return { isSignUp: !prevState.isSignUp }
      })
   }

   render() {
      const formElementsArray = [];
      for (let key in this.state.authForm) {
         formElementsArray.push({
            id: key,
            config: this.state.authForm[key]
         })
      }

      const form = formElementsArray.map(el => (
         < Input
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            key={el.id}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            changed={(e) => this.inputChangedHandler(e, el.id)}
         />
      ))
      return (
         <div className={classes.Authentication}>
            <form onSubmit={this.submitHandler}>
               {form}
               <Button btnType='Success'>{this.state.isSignUp ? 'Sign in!' : 'Sign up!'}</Button>
            </form>
            <Button btnType='Danger' clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? `Don't have account? Create one!` : 'Already registered? Sing in!'}</Button>
         </div>
      );
   }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
   onAuth: (email, password, isSingedUp) => dispatch(actions.auth(email, password, isSingedUp))
})

export default connect(null, mapDispatchToProps)(Authentication);