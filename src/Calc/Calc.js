import React from 'react';
import './Calc.css';

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcResult: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {rate: props.rate};
  }

  calcRate = (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    let countCurrency = elements['count-currency'].value;
    let typeCurrency = elements['type-currency'].value;
    this.setState({ calcResult: (countCurrency / this.state.rate[typeCurrency]).toFixed(2)})
  }

  render () {
    return (
      <div className='calculator'>
        <h3> Калькулятор обмена</h3>
                <div className="block">
                    <div>Я хочу</div>
                    <div>
                      <form onSubmit={this.calcRate}>
                        <input type="number" defaultValue="150" name='count-currency'/>
                        <select name="type-currency" id="">
                            {Object.keys(this.props.rate).map( keyName => 
                              <option key={keyName} value={keyName}>{keyName}</option>
                            )}
                        </select>
                        <input type='submit' value='Обменять'/>
                        </form>
                    </div>
                    <div>
                        <h4>Результат</h4>
                        <ul className="calc-res">
                            <li>{this.state.calcResult} USD</li>
                            
                        </ul>
                    </div>
                </div>
      </div>
    )
  };
}

export default Calc;
