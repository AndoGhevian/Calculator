export const validator = {
    notEmptyString: function (value) {
        if (value === '') {
            return false;
        }
        return true;
    },
    isNumber: function (value) {
        if (value !== '' && !isNaN(+value)) {
            return true;
        }
        return false;
    },
    emptyOrNumber: function (value) {
        if (!isNaN(+value)) {
            return true;
        }
        return false;
    }
}

export function validate(value, validations) {
    // debugger
    const isInvalide = validations.some(name => {
        console.log(name);
        return !validator[name](value);
    })

    return !isInvalide;
}
export default validate;