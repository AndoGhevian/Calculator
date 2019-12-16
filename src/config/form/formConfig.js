// this config file must work (and all configs must work in) design time in webpack, but i`m not dive into webpack deeeple, sooo:) sorry:)
import * as dependensies from './dependensies';

const formConfig = {
    D1: {
        type: 'select',
        valueType: 'string',
        name: 'customerType',
        value: 'I am first time buyer',
        values: [
            'I am first time buyer',
            'I am remortgaging',
            'I am moving house'
        ],
        checked: false,
        checked: false,
        valid: null,
        validations: ['notEmptyString'],
        touched: false,
        managable: true,
        desc: 'Type of Customer',
        unit: '',
        endDesc: ''
    },
    D2: {
        type: 'select',
        valueType: 'string',
        name: 'repaymentType',
        value: 'Interest Only',
        values: [
            'Interest Only',
            'Repayment'
        ],
        checked: false,
        valid: null,
        validations: ['notEmptyString'],
        touched: false,
        managable: true,
        desc: 'Repayment Type',
        unit: '',
        endDesc: ''
    },
    D3: {
        type: 'input',
        valueType: 'number',
        name: 'propertyValue',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        touched: false,
        managable: true,
        desc: 'Property Value',
        unit: '£',
        endDesc: ''
    },
    D4: {
        type: 'input',
        valueType: 'number',
        name: 'depositAmount',
        value: '',
        checked: false,
        valid: null,
        validations: ['emptyOrNumber'],
        touched: false,
        managable: true,
        desc: 'Deposit Amount',
        unit: '£',
        endDesc: ''
    },
    D5: {
        type: 'input',
        valueType: 'number',
        name: 'netPropertyValue',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D3',
            'D4'
        ],
        calculationFunction: dependensies.D5,
        managable: false,
        desc: 'Net Property Value',
        unit: '£',
        endDesc: ''
    },
    D6: {
        type: 'input',
        valueType: 'number',
        name: 'mortgageTerm',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        touched: false,
        managable: true,
        desc: 'Mortgage Term',
        unit: '',
        endDesc: 'Years'
    },
    D7: {
        type: 'input',
        valueType: 'number',
        name: 'mortgageTermMonth',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D6'
        ],
        calculationFunction: dependensies.D7,
        managable: false,
        desc: 'Mortgage Term (Months)',
        unit: '',
        endDesc: 'Months'
    },
    D8: {
        type: 'input',
        valueType: 'number',
        name: 'compoundingPeriodPerYear',
        value: '12',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [

        ],
        managable: false,
        desc: 'Compounding Period Per Year',
        unit: '',
        endDesc: ''
    },
    D9: {
        type: 'input',
        valueType: 'number',
        name: 'initialInteresRate',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        touched: false,
        managable: true,
        desc: 'Initial Interest Rate',
        unit: '',
        endDesc: ''
    },
    D10: {
        type: 'empty',
    },
    D11: {
        type: 'input',
        valueType: 'number',
        name: 'monthlyMortgagePayment',
        color: 'grey',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D1',
            'D2',
            'D3',
            'D5',
            'D7',
            'D8',
            'D9'
        ],
        mapDependensies: (dependensiesMap) => ({
            D1: { values: dependensiesMap.D1.values },
            D2: { values: dependensiesMap.D2.values }
        }),
        calculationFunction: dependensies.D11,
        managable: false,
        desc: 'Monthly Mortgage Payment',
        unit: '£',
        endDesc: ''
    },
    D12: {
        type: 'input',
        valueType: 'number',
        name: 'totalMortgageCostWithInterest',
        color: 'grey',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D7',
            'D11'
        ],
        calculationFunction: dependensies.D12,
        managable: false,
        desc: 'Total Mortgage Cost (with interest)',
        unit: '£',
        endDesc: ''
    },
    D13: {
        type: 'empty',
    },
    D14: {
        type: 'input',
        valueType: 'number',
        name: 'loanToValueLTV',
        color: 'grey',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D5',
            'D12'
        ],
        calculationFunction: dependensies.D14,
        managable: false,
        desc: 'Loan to Value (LTV)',
        unit: '',
        endDesc: ''
    },
    D15: {
        type: 'input',
        valueType: 'number',
        name: 'totalMortgageCostInInterestOnlyCase',
        color: 'grey',
        value: '',
        checked: false,
        valid: null,
        validations: ['isNumber'],
        dependensies: [
            'D1',
            'D2',
            'D3',
            'D5',
            'D12'
        ],
        mapDependensies: (dependensiesMap) => ({
            D1: { values: dependensiesMap.D1.values },
            D2: { values: dependensiesMap.D2.values }
        }),
        calculationFunction: dependensies.D15,
        managable: false,
        desc: 'Total Mortgage Cost (in Interest Only Case)',
        unit: '£',
        endDesc: ''
    },
}

export function getNewForm() {
    const newForm = { ...formConfig };
    Object.keys(newForm).forEach(identifier => {
        if (typeof newForm[identifier] === 'object') {
            Array.isArray(newForm[identifier]) ?
                newForm[identifier] = [...newForm[identifier]] :
                newForm[identifier] = { ...newForm[identifier] };
        }
    });
    return newForm;
}

export default formConfig;