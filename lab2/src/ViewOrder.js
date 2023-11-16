import { Component } from 'react';

class ViewOrder extends Component {
  render() {
    return(
      <div className="container py-4">
        <div className="continer col-12">
          <div className="row h-200 p-5 bg-light border rounded-3">
            <h2>Kundvagn</h2>
        
            <ul>
              {this.props.orders.map(order => 
                <li key={order.uuid}>{order.uuid + ' innehåller: '
                  + order.inv.foundation + ', '
                  + order.inv.protein + ', '
                  + order.inv.extras + ' och '
                  + order.inv.dressing
                }</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewOrder;