import validate from '../../utils/validate';

function getValue(form, identifier) {
    switch (form[identifier].valueType) {
        case 'string':
            return form[identifier].value + '';
        case 'number':
            return +form[identifier].value;
        default: return form[identifier].value;
    }
}

export function calculateDependensies(form, identifier) {
    const alreadyChecked = form[identifier].checked;
    if (alreadyChecked) {
        return form[identifier].valid;
    }

    const managable = !!form[identifier].managable;
    if (managable) {
        const validations = form[identifier].validations;
        const value = form[identifier].value;
        form[identifier].valid = validate(value, validations);
        form[identifier].checked = true;
        return form[identifier].valid;
    }
    
    const hasDependensies = !!form[identifier].dependensies.length;
    if (!hasDependensies) {
        form[identifier].valid = true;
        form[identifier].checked = true;
        return form[identifier].valid;
    }

    const dependensies = form[identifier].dependensies;
    const valid = dependensies.every(dependency => calculateDependensies(form, dependency));
    form[identifier].valid = valid;
    form[identifier].checked = true;

    if (!valid) {
        form[identifier].value = '';
        return valid;
    }

    const args = form[identifier].dependensies.map(dependency => getValue(form, dependency));
    const dependensiesMap = form[identifier].dependensies.reduce((map, dependency) => {
        map[dependency] = form[dependency]
        return map;
    }, {});
    const mapingFunction = form[identifier].mapDependensies;
    const mapedDependensies = typeof mapingFunction === 'function' ? mapingFunction(dependensiesMap) : {};

    form[identifier].value = form[identifier].calculationFunction(form)(mapedDependensies)(...args);
    return valid;
}

export function calculate(form) {
    const calculatedForm = { ...form };
    const identifiers = Object.keys(calculatedForm);
    identifiers.forEach(identifier => calculatedForm[identifier] = { ...calculatedForm[identifier] });
    identifiers.forEach(identifier => {
        if(calculatedForm[identifier].type === 'empty') {
            return;
        }
        calculateDependensies(calculatedForm, identifier)
    });
    identifiers.forEach(identifier => calculatedForm[identifier].checked = false);
    return calculatedForm;
}