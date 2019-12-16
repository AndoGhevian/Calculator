import React from 'react';

import classes from './FormControl.module.css';

const FormControl = (props) => {
    let control = null;
    switch (props.type) {
        case 'input':
            control = (
                <input disabled={!props.managable} name={props.name} type="text" value={props.value} onChange={props.managable ? (event) => props.onChange(props.identifier, event.target.value) : null} />
            )
            break;
        case 'select':
            control = (
                <select disabled={!props.managable} name={props.name} value={props.value} onChange={props.managable ? (event) => props.onChange(props.identifier, event.target.value) : null}>
                    {props.values.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))}
                </select>
            );
            break;
        case 'empty':
            control = null;
            break;
        default:
            control = (
                <input disabled={!props.managable} name={props.name} type="text" value={props.value} onChange={props.managable ? (event) => props.onChange(props.identifier, event.target.value) : null} />
            );
    }

    let color = 'white';
    if (props.color) {
        color = props.color;
    }

    let ControlClassName = [classes.FormControl];
    if(!props.managable) {
        ControlClassName.push(classes.MuteControl);
    }
    if (props.touched) {
        ControlClassName = props.valid ? [classes.FormControl, classes.Success] : [classes.FormControl, classes.Error];
    }
    

    return (
        <div className={ControlClassName.join(' ')}>
            <div>{props.desc}</div>
            <div>{props.unit}</div>
            <div>{control}</div>
            <div>{props.endDesc}</div>
        </div>
    );
}

export default FormControl;