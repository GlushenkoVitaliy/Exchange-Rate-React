import React from 'react';
import './Rate.css';

import Calc from '../Calc/Calc';

class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'date': '',
      'currentcyRate': {}
    }
    this.currrency = ['EUR', 'RUB', 'CAD', 'PHP'];
    this.getRate();
  }
  getRate = () => {
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ date: data.date});
        let result = {};
        this.currrency.forEach((element, i) => {
          result[this.currrency[i]] = data.rates[this.currrency[i]];
        })
        this.setState({currentcyRate: result})

      })
  }
  render () {
    return (
        <div className='rate'>
            <h3> Курс валют на {this.state.date} относительно USD</h3>
            <div className="flex-container">
                {Object.keys(this.state.currentcyRate).map((keyName, i) => 
                  (
                    <div className="block flex-item" key={keyName}>
                        <div className="currency-name">{keyName}</div>
                        <div className="currency-in">{this.state.currentcyRate[keyName].toFixed(2)}</div>
                        <p>* можно купить за 1 USD</p>
                    </div>
                  )
                )}
                
            </div>
            <Calc rate={this.state.currentcyRate}/>
        </div>

    )
  };
}

export default Rate;
