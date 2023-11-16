import { Component } from 'react';

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(event) {
    event.preventDefault();
    const newSalad = this.props.orders.map(salad => Object.values(salad.inv));

    fetch("http://localhost:8080/orders/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSalad)
    }).then(res => res.json())
      .then(data => {
        if (data.order.length > 0) {
          console.log('Success:', data);
          this.props.confirmation(data);
          alert(JSON.stringify(data));
        } else {
          alert('Kundvagnen är tom');
        }
      })
      .catch(error => {
        console.error('Error:', error)
      });
    
    this.props.navigate("/order-confirmation");
    window.localStorage.setItem("order", "[]");
  } 

  render() {
    return(
      <div className="container py-4">
        <div className="continer col-12">
          <div className="row h-200 p-5 bg-light border rounded-3">
            <h2>Varukorg</h2>
        
            <ul>
              {this.props.orders.map(order => {
                if (this.props.orders.length !== 0) {
                  return (
                  <li key={order.uuid}>{order.uuid + ' innehåller: '
                    + order.inv.foundation + ', '
                    + order.inv.protein + ', '
                    + order.inv.extras + ' och '
                    + order.inv.dressing
                  }</li>);
                } else {
                  return "";
                }
              })}
            </ul>
            
            <form method="post" onSubmit={this.handleOrder} className="needs-validation">
              <button className="btn btn-primary" type="submit">Beställ</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewOrder;