import React, { Component } from 'react';

import calculate from '../../utils/calculate';
import FormControl from '../../components/FormControl/FormControl'
import classes from './Form.module.css';

import { getNewForm } from '../../config/form';

class App extends Component {
    state = {
        form: getNewForm()
    }

    onChangeHandler = (identifier, value) => {
        const form = { ...this.state.form };
        form[identifier] = { ...form[identifier] };
        form[identifier].value = value;
        // debugger
        const finalForm = calculate(form, ['D5', 'D7', 'D11', 'D12', 'D14', 'D15']);
        this.setState({ form: finalForm });
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
                managable={form[identifier].managable}
                onChange={this.onChangeHandler}
                desc={form[identifier].desc}
                unit={form[identifier].unit}
                endDesc={form[identifier].endDesc} />
        ));

        return (
            <div className={classes.FormContainer}>
                <form className={classes.Form} action="/" method='POST'>
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
