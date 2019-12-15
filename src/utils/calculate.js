import { Finance } from 'financejs'
let finance = new Finance();

function IPMT(rate, period, periods, present, future, type) {
    var type = (typeof type === 'undefined') ? 0 : type;

    rate = eval(rate);
    periods = eval(periods);

    var payment = finance.PMT(rate, periods, present, future, type);

    var interest;
    if (period === 1) {
        if (type === 1) {
            interest = 0;
        } else {
            interest = -present;
        }
    } else {
        if (type === 1) {
            interest = finance.FV(rate, period - 2, payment, present, 1) - payment;
        } else {
            interest = finance.FV(rate, period - 1, payment, present, 0);
        }
    }

    return interest * rate;
}

export const calcNetPropertyValue = (form) => {
    return form.propertyValue.value - form.depositAmount.value;
}
export const calcMortgageTermMonth = (form) => {
    return form.mortgageTerm.value * 12;
}

export const calcMonthlyMortgagePayment = (form) => {
    console.log(form);
    let condition = (form.customerType.value === form.customerType.values[0])
        && form.repaymentType.value === form.repaymentType.values[1];
    if (condition) {
        return finance.PMT(
            (+form.initialInteresRate.value / +form.compoundingPeriodPerYear.value),
            +form.mortgageTermMonth.value,
            -form.netPropertyValue.value
        );
    }

    condition = (form.customerType.value === form.customerType.values[1])
        && form.repaymentType.value === form.repaymentType.values[1];
    if (condition) {
        return finance.PMT(
            (+form.initialInteresRate.value / +form.compoundingPeriodPerYear.value),
            +form.mortgageTermMonth.value,
            -form.propertyValue.value
        );
    }

    condition = (form.customerType.value === form.customerType.values[1])
        && form.repaymentType.value === form.repaymentType.values[0];
    if (condition) {
        return IPMT(
            (+form.initialInteresRate.value / +form.compoundingPeriodPerYear.value),
            1,
            +form.mortgageTermMonth.value,
            -form.propertyValue.value
        );
    }

    condition = (form.customerType.value === form.customerType.values[2])
        && form.repaymentType.value === form.repaymentType.values[1];
    if (condition) {
        return finance.PMT(
            (+form.initialInteresRate.value / +form.compoundingPeriodPerYear.value),
            +form.mortgageTermMonth.value,
            -form.netPropertyValue.value
        );
    }

    condition = (form.customerType.value === form.customerType.values[2])
        && form.repaymentType.value === form.repaymentType.values[0];
    if (condition) {
        return IPMT(
            (+form.initialInteresRate.value / +form.compoundingPeriodPerYear.value),
            1,
            +form.mortgageTermMonth.value,
            -form.netPropertyValue.value
        );
    }
    return 0;
}

export const calcTotalMortgageCostWithInterest = (form) => {
    return form.monthlyMortgagePayment.value * form.mortgageTermMonth.value
}

export const calcLoanToValueLTV = (form) => {
    return form.totalMortgageCostWithInterest.value / form.netPropertyValue.value;
}

export const calcTotalMortgageCostInInterestOnlyCase = (form) => {
    let condition = (form.repaymentType.value === form.repaymentType.values[0])
        && (form.customerType.value === form.customerType.values[2]);
    if (condition) {
        return +form.totalMortgageCostWithInterest.value + +form.netPropertyValue.value;
    }

    condition = (form.repaymentType.value === form.repaymentType.values[0])
    if (condition) {
        return +form.totalMortgageCostWithInterest.value + +form.propertyValue.value
    }
    return 0;
}



export const calculateByName = (form, name) => {
    switch (name) {
        case 'netPropertyValue':
            return calcNetPropertyValue(form);
        case 'mortgageTermMonth':
            return calcMortgageTermMonth(form);
        case 'monthlyMortgagePayment':
            const value = calcMonthlyMortgagePayment(form);
            // console.log('monthlyMortgagePayment')
            // console.log(value)
            return value;
        case 'totalMortgageCostWithInterest':
            return calcTotalMortgageCostWithInterest(form);
        case 'loanToValueLTV':
            return calcLoanToValueLTV(form);
        case 'totalMortgageCostInInterestOnlyCase':
            return calcTotalMortgageCostInInterestOnlyCase(form);
        default: return null;
    }
}


const calculate = (form, names) => {
    let resultForm = { ...form };
    names.forEach(name => {
        resultForm[name] = { ...resultForm[name] }
        resultForm[name].value = calculateByName(resultForm, name) + '';
        // console.log(name)
        // console.log(resultForm[name].value)
    });
    // console.log({ resultForm })
    return resultForm;
}


export default calculate;