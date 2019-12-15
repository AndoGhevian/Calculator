import React from 'react';

import classes from './FormControl.module.css';

const FormControl = (props) => {
    let control = null;
    switch (props.type) {
        case 'input':
            control = (
                <input disabled={!props.managable} name={props.name} type="text" value={props.value} onChange={props.managable ? (event) => props.onChange(event.target.name, event.target.value) : null} />
            )
            break;
        case 'select':
            control = (
                <select disabled={!props.managable} name={props.name} value={props.value} onChange={props.managable ? (event) => props.onChange(event.target.name, event.target.value) : null}>
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
                <input disabled={!props.managable} name={props.name} type="text" value={props.value} onChange={props.managable ? (event) => props.onChange(event.target.name, event.target.value) : null} />
            );
    }

    let color = 'white';
    if(props.color) {
        color = props.color;
    }
    
    return (
        <tr className={classes.FormControl}>
            <td>{props.desc}</td>
            <td>{props.unit}</td>
            <td>{control}</td>
            <td>{props.endDesc}</td>
        </tr>
    );
}

export default FormControl;