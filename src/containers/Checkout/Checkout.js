import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
   render() {
      return (
         <div>
            <CheckoutSummary ingredients={this.props.location.state} />
         </div>
      )
   }
}

export default Checkout 