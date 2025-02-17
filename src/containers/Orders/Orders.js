import React, { Component } from 'react';
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import Order from '../../components/Order/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spiner/Spiner'

class Orders extends Component {

   componentDidMount() {
      this.props.onFetchOrders(this.props.token, this.props.userId);
   }

   render() {
      let orders = < Spinner />
      if (!this.props.loading) {
         orders = (<div>
            {this.props.orders.map(order => < Order
               key={order.id}
               ingredients={order.ingredients}
               price={order.price}
            />)}
         </div>)
      }

      return (
         orders
      );
   }
}

const mapStateToProps = state => ({
   orders: state.orders.orders,
   loading: state.orders.loading,
   token: state.auth.token,
   userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
   onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))