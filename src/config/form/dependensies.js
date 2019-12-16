import Finance from '../../utils/Finance';
let finance = new Finance();


export const D5 = (form) => (mapedDependensies) => (D3, D4) => {
    return D3 - D4;
}

export const D7 = (form) => (mapedDependensies) => (D6) => {
    return D6 * 12;
}

export const D11 = (form) => (mapedDependensies) => (D1, D2, D3, D5, D7, D8, D9) => {
    const D9Percent = D9 / 100;
    if (D1 === mapedDependensies.D1.values[0] && D2 === mapedDependensies.D2.values[1]) {
        return finance.PMT(
            (D9Percent / D8),
            D7,
            -D3
        );
    }

    if (D1 === mapedDependensies.D1.values[1]) {
        switch (D2) {
            case mapedDependensies.D2.values[0]:
                return finance.IPMT(
                    (D9Percent / D8),
                    1,
                    D7,
                    -D3
                );
            case mapedDependensies.D2.values[1]:
                return finance.PMT(
                    (D9Percent / D8),
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
                    (D9Percent / D8),
                    1,
                    D7,
                    -D5
                );
            case form.D2.values[1]:
                return finance.PMT(
                    (D9Percent / D8),
                    D7,
                    -D5
                );
            default: break;
        }
    }

    return 0;
}

export const D12 = (form) => (mapedDependensies) => (D7, D11) => {
    return D11 * D7
}

export const D14 = (form) => (mapedDependensies) => (D5, D12) => {
    return D12 / D5;
}

export const D15 = (form) => (mapedDependensies) => (D1, D2, D3, D5, D12) => {
    if (D2 === mapedDependensies.D2.values[0] && D1 === mapedDependensies.D1.values[2]) {
        return D12 + D5;
    } else if (D2 === mapedDependensies.D2.values[0]) {
        return D12 + D3;
    }
    return 0;
}