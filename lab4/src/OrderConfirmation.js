import { Component } from "react";

class OrderConfirmation extends Component {
  render() {
    return (
      <div>
        <h3>Orderbekräftelse</h3>
        <div>
          {this.props.confirmation.map(n => 
              <div>
                <div>
                  Status: {n.status}
                </div>
              
                <div>
                  Ordernummer: {n.uuid}
                </div>
              
                <div>
                  Tid: {n.timestamp}
                </div>
              
                <div>
                  Antal sallader: {n.order.length}
                </div>
              
                <div>
                  Pris: {n.price}
                </div>
              </div>
          )}
        </div>
      </div>
    )
  }
}
export default OrderConfirmation;