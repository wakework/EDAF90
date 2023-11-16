import Salad from './Salad.ES6';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: "",
      protein: "",
      extras: [], 
      dressing: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;

    this.setState({
      [name]: event.target.value});
  }

  handleInputChange(event) {
    let target = event.target;
    let id = target.getAttribute('id');
    let name = target.getAttribute('name');

    if (target.checked) {
      this.setState({
        [name]: [...this.state[name], id]
      });
    } else {
      this.setState({
        [name]: this.state[name].filter(e => e !== id)
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (event.target.checkValidity() === false) {
      alert('Välj bas, protein och dressing för att genomföra ordern!');
      event.target.classList.add("was-validated");

    } else {
      alert('En sallad beställd!');

      let salad = new Salad();
      let keys = Object.keys(this.state);
      let values = Object.values(this.state);

      // Add new salad
      for (let i = 0; i < keys.length; i++) {
        salad.add(keys[i], values[i]);
      }

      // Clear old salad
      this.setState({
        foundation: "Sallad",
        protein: "",
        extras: [],
        dressing: ""
      });

      // Send salad
      this.props.addOrder(salad);

      // Navigate to view-order
      this.props.navigate("/view-order");
    }
  }

  render() {
    let foundations = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation);
    let proteins = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].protein);
    let extras = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra);
    let dressings = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing);

    return (
      <div className="continer col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>

          <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label className="form-label">Välj bas:</label>
              <select required
                className="form-select" 
                aria-label="Default select example"
                value={this.state.foundation} 
                name="foundation"
                onChange={this.handleChange}
                >
                <option value="">Välj bas...</option>
                {foundations.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="invalid-feedback">Vänligen fyll i bas</div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Välj protein:</label>
              <select required
                className="form-select" 
                aria-label="Default select example"
                value={this.state.protein} 
                name="protein"
                onChange={this.handleChange}
                >
                <option value="">Välj protein...</option>
                {proteins.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="invalid-feedback">Vänligen fyll i protein!</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Välj dressing:</label>
              <select required
                className="form-select" 
                aria-label="Default select example"
                value={this.state.dressing}
                name="dressing" 
                onChange={this.handleChange}
                >
                <option value="">Välj dressing...</option>
                {dressings.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
              <div className="invalid-feedback">Vänligen fyll i dressing!</div>
            </div>
          
            <div className="mb-3">
              <label className="form-label">Välj tillbehör:</label>
            </div>
            {extras.map(name => (
              <div className="form-check form-check-inline" key={name}>
                <label>
                  <input id={name}
                    name="extras"
                    className="form-check-input"
                    type="checkbox" 
                    checked={this.state.extras.includes(name) || false}  
                    onChange={this.handleInputChange}>
                  </input>
                  <Link className="nav-link" to={"/view-ingredient/" + name}>{' ' + name}</Link>
                </label>
              </div>
            ))}
            
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Beställ</button>
            </div>
            
            {console.log(this.state)}
          </form>
        </div>
      </div>
    );
  }
}
export default ComposeSalad;