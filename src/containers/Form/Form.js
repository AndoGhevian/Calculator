import React, { Component } from 'react';

import {default as calculate, getNewForm} from '../../config/form/index';
import FormControl from '../../components/FormControl/FormControl'
import classes from './Form.module.css';


class App extends Component {
    state = {
        form: getNewForm()
    }

    onChangeHandler = (identifier, value) => {
        const changedForm = { ...this.state.form };
        changedForm[identifier] = { ...changedForm[identifier] };
        changedForm[identifier].value = value;
        changedForm[identifier].touched = true;

        const calculatedForm = calculate(changedForm)
        this.setState({ form: calculatedForm });
    }

    render() {
        const form = this.state.form;
        const controlsTransform = Object.keys(form).map(identifier => (
            <FormControl
                key={identifier}
                identifier={identifier}
                type={form[identifier].type}
                values={form[identifier].values}
                name={form[identifier].name}
                value={form[identifier].value}
                valid={form[identifier].valid}
                touched={form[identifier].touched}
                managable={form[identifier].managable}
                onChange={this.onChangeHandler}
                desc={form[identifier].desc}
                unit={form[identifier].unit}
                endDesc={form[identifier].endDesc} />
        ));

        return (
            <div className={classes.FormContainer}>
                <form className={classes.Form} action="/" method='POST'>
                    <div className={classes.FormHeader}>Bankrate Calculator</div>
                    <div className={classes.FormContent}>
                        {controlsTransform}
                    </div>
                </form>
            </div>
        );
    }
}

export default App;
