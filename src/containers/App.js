import React, { Component } from 'react';

import calculate from '../utils/calculate';
import FormControl from '../components/FormControl/FormControl'
import './App.css';

class App extends Component {
  state = {
    form: {
      customerType: {
        type: 'select',
        value: 'I am first time buyer',
        values: [
          'I am first time buyer',
          'I am remortgaging',
          'I am moving house'
        ],
        managable: true,
        desc: 'Type of Customer',
        unit: '',
        endDesc: ''
      },
      repaymentType: {
        type: 'select',
        value: 'Interest Only',
        values: [
          'Interest Only',
          'Repayment'
        ],
        managable: true,
        desc: 'Repayment Type',
        unit: '',
        endDesc: ''
      },
      propertyValue: {
        type: 'input',
        value: '',
        managable: true,
        desc: 'Property Value',
        unit: '£',
        endDesc: ''
      },
      depositAmount: {
        type: 'input',
        value: '',
        managable: true,
        desc: 'Deposit Amount',
        unit: '£',
        endDesc: ''
      },
      netPropertyValue: {
        type: 'input',
        value: '',
        managable: false,
        desc: 'Net Property Value',
        unit: '£',
        endDesc: ''
      },
      mortgageTerm: {
        type: 'input',
        value: '',
        managable: true,
        desc: 'Mortgage Term',
        unit: '',
        endDesc: 'Years'
      },
      mortgageTermMonth: {
        type: 'input',
        value: '',
        managable: false,
        desc: 'Mortgage Term (Months)',
        unit: '',
        endDesc: 'Months'
      },
      compoundingPeriodPerYear: {
        type: 'input',
        value: 12,
        managable: false,
        desc: 'Compounding Period Per Year',
        unit: '',
        endDesc: ''
      },
      initialInteresRate: {
        type: 'input',
        value: '',
        managable: true,
        desc: 'Initial Interest Rate',
        unit: '',
        endDesc: ''
      },
      empty: {
        type: 'empty',
      },
      monthlyMortgagePayment: {
        type: 'input',
        color: 'grey',
        value: '',
        managable: false,
        desc: 'Monthly Mortgage Payment',
        unit: '£',
        endDesc: ''
      },
      totalMortgageCostWithInterest: {
        type: 'input',
        color: 'grey',
        value: '',
        managable: false,
        desc: 'Total Mortgage Cost (with interest)',
        unit: '£',
        endDesc: ''
      },
      empty: {
        type: 'empty',
      },
      loanToValueLTV: {
        type: 'input',
        color: 'grey',
        value: '',
        managable: false,
        desc: 'Loan to Value (LTV)',
        unit: '',
        endDesc: ''
      },
      totalMortgageCostInInterestOnlyCase: {
        type: 'input',
        color: 'grey',
        value: '',
        managable: false,
        desc: 'Total Mortgage Cost (in Interest Only Case)',
        unit: '£',
        endDesc: ''
      },

    }
  }

  onChangeHandler = (name, value) => {
    console.log('onChangeHandler');
    const form = { ...this.state.form };
    form[name] = { ...form[name] };
    // if (name === 'initialInteresRate') {
    //   form[name].value = value;
    // } else {
    // }
    form[name].value = value;


    const finalForm = calculate(form, ['netPropertyValue', 'mortgageTermMonth', 'monthlyMortgagePayment', 'totalMortgageCostWithInterest', 'loanToValueLTV', 'totalMortgageCostInInterestOnlyCase']);
    this.setState({ form: finalForm });
  }

  render() {
    const form = this.state.form;
    // console.log(form);
    const controlsTransform = Object.keys(form).map(controlName => (
      <FormControl
        key={controlName}
        type={form[controlName].type}
        values={form[controlName].values}
        name={controlName}
        value={form[controlName].value}
        managable={form[controlName].managable}
        onChange={this.onChangeHandler}
        desc={form[controlName].desc}
        unit={form[controlName].unit}
        endDesc={form[controlName].endDesc} />
    ));

    return (
      <div className="App">
        <form action="/" method='POST'>
          <table border='1'>
            <thead><tr><td colSpan={4}></td></tr></thead>
            <tbody>
              {controlsTransform}

            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default App;
