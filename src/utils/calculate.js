import { getValue, validDependensies } from '../config/form';
import Finance from '../utils/Finance';
let finance = new Finance();


export const calcD5 = (form) => {
    const D3 = getValue(form, 'D3');
    const D4 = getValue(form, 'D4');
    console.log('hsssssssssssssssssss')
    console.log(D3)
    console.log(D4)
    console.log(D3 - D4)
    return D3 - D4;
}
export const calcD7 = (form) => {
    const D6 = getValue(form, 'D6');
    return D6 * 12;
}

export const calcD11 = (form) => {
    const D1 = getValue(form, 'D1');
    const D2 = getValue(form, 'D2');
    const D3 = getValue(form, 'D3');
    const D5 = getValue(form, 'D5');
    const D7 = getValue(form, 'D7');
    const D8 = getValue(form, 'D8');
    const D9 = getValue(form, 'D9');

    if (D1 === form.D1.values[0] && D2 === form.D2.values[1]) {
        return finance.PMT(
            (D9 / D8),
            D7,
            -D3
        );
    }

    if (D1 === form.D1.values[1]) {
        switch (D2) {
            case form.D2.values[0]:
                return finance.IPMT(
                    (D9 / D8),
                    1,
                    D7,
                    -D3
                );
            case form.D2.values[1]:
                return finance.PMT(
                    (D9 / D8),
                    D7,
                    -D3
                );
            default: break;
        }
    }

    if (D1 === form.D1.values[2]) {
        switch (D2) {
            case form.D2.values[0]:
                return finance.IPMT(
                    (D9 / D8),
                    1,
                    D7,
                    -D5
                );
            case form.D2.values[1]:
                return finance.PMT(
                    (D9 / D8),
                    D7,
                    -D5
                );
            default: break;
        }
    }

    return 0;

    // let condition = (form.D1.value === form.D1.values[0])
    //     && form.D2.value === form.D2.values[1];
    // if (condition) {
    //     return finance.PMT(
    //         (+form.D9.value / +form.D8.value),
    //         +form.D7.value,
    //         -form.netD3.value
    //     );
    // }

    // condition = (form.D1.value === form.D1.values[1])
    //     && form.D2.value === form.D2.values[1];
    // if (condition) {
    //     return finance.PMT(
    //         (+form.D9.value / +form.D8.value),
    //         +form.D7.value,
    //         -form.D3.value
    //     );
    // }

    // condition = (form.D1.value === form.D1.values[1])
    //     && form.D2.value === form.D2.values[0];
    // if (condition) {
    //     return finance.IPMT(
    //         (+form.D9.value / +form.D8.value),
    //         1,
    //         +form.D7.value,
    //         -form.D3.value
    //     );
    // }

    // condition = (form.D1.value === form.D1.values[2])
    //     && form.D2.value === form.D2.values[1];
    // if (condition) {
    //     return finance.PMT(
    //         (+form.D9.value / +form.D8.value),
    //         +form.D7.value,
    //         -form.D5.value
    //     );
    // }

    // condition = (form.D1.value === form.D1.values[2])
    //     && form.D2.value === form.D2.values[0];
    // if (condition) {
    //     return finance.IPMT(
    //         (+form.D9.value / +form.D8.value),
    //         1,
    //         +form.D7.value,
    //         -form.D5.value
    //     );
    // }
    // return 0;
}

export const calcD12 = (form) => {
    const D7 = getValue(form, 'D7');
    const D11 = getValue(form, 'D11');

    return D11 * D7
}

export const calcD14 = (form) => {
    const D5 = getValue(form, 'D5');
    const D12 = getValue(form, 'D12');

    return D12 / D5;
}

export const calcD15 = (form) => {
    const D1 = getValue(form, 'D1');
    const D2 = getValue(form, 'D2');
    const D3 = getValue(form, 'D3');
    const D5 = getValue(form, 'D5');
    const D12 = getValue(form, 'D12');

    if (D2 === form.D2.values[0] && D1 === form.D1.values[2]) {
        return D12 + D5;
    } else if (D2 === form.D2.values[0]) {
        return D12 + D3;
    }
    return 0;




    //     let condition = (form.D2.value === form.D2.values[0])
    //         && (form.D1.value === form.D1.values[2]);
    // if (condition) {
    //     return +form.D12.value + +form.D5.value;
    // }

    // condition = (form.D2.value === form.D2.values[0])
    // if (condition) {
    //     return +form.D12.value + +form.D3.value
    // }
    // return 0;
}

export const calculateByIdentifier = (form, identifier) => {
    switch (identifier) {
        case 'D5':
            return calcD5(form);
        case 'D7':
            return calcD7(form);
        case 'D11':
            return calcD11(form);
        case 'D12':
            return calcD12(form);
        case 'D14':
            return calcD14(form);
        case 'D15':
            return calcD15(form);
        default: return null;
    }
}


const calculate = (form, identifiers) => {
    let resultForm = { ...form };
    identifiers.forEach(identifier => {
        resultForm[identifier] = { ...resultForm[identifier] }
        if (validDependensies(resultForm, identifier)) {
            // debugger
            
            resultForm[identifier].value = calculateByIdentifier(resultForm, identifier) + '';
            if(identifier === 'D5') {
                console.log(identifier)
                console.log(resultForm[identifier].value)
            }
            // debugger
            return;
        }

        resultForm[identifier].value = '';//state must contain only string!
        // if(identifier === 'D5') debugger
    });
    return resultForm;
}


export default calculate;