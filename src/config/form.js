import validate from '../utils/validate';

// this config file must work (and all configs must work in) design time in webpack, but i`m not dive into webpack deeeple, sooo:) sorry:)
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
        valid: null,
        validations: ['notEmptyString'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['notEmptyString'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['isNumber'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['emptyOrNumber'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D3', 'D4'],
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
        valid: null,
        validations: ['isNumber'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D6'],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: [],
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
        valid: null,
        validations: ['isNumber'],
        touched: false,
        dependensies: [],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D1', 'D2', 'D3', 'D5', 'D7', 'D8', 'D9'],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D7', 'D11'],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D5', 'D12'],
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
        valid: null,
        validations: ['isNumber'],
        dependensies: ['D1', 'D2', 'D3', 'D5', 'D12'],
        managable: false,
        desc: 'Total Mortgage Cost (in Interest Only Case)',
        unit: '£',
        endDesc: ''
    },
}

export function validValue(form, identifier) {
    const validations = form[identifier].validations;
    const value = form[identifier].value;
    if (identifier === 'D5') {
        // debugger

    }
    const isValid = validate(value, validations)
    return isValid;
}

export function validDependensies(form, identifier) {
    const dependensies = form[identifier].dependensies;
    // debugger
    const isInvalid = dependensies.some(dep => {
        // if (identifier === 'D11')
        // debugger
        return !validValue(form, dep)
    });
    return !isInvalid;
}

export function getValue(form, identifier) {
    switch (form[identifier].valueType) {
        case 'string':
            return form[identifier].value + '';
        case 'number':
            return +form[identifier].value;
        default: return form[identifier].value;
    }
}

export function getNewForm() {
    const newForm = { ...formConfig };
    Object.keys(newForm).forEach(property => {
        if (typeof newForm[property] === 'object') {
            Array.isArray(newForm[property]) ?
                newForm[property] = [...newForm[property]] :
                newForm[property] = { ...newForm[property] };
        }
    });
    return newForm;
}

export default formConfig;