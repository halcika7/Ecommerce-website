import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const LoginRegisterInputs = ({
    name,
    placeholder,
    value,
    label,
    error,
    type,
    onChange,
    formBox,
    invalidFeedback,
    invalidInput,
    inputClass
}) => {
    return (
    <div className={formBox}>
        <label>{label}</label>
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            className={classnames(inputClass ? inputClass : '', {
                [invalidInput]: error
            })}
            value={value}
            onChange={onChange}/>

            {error && (<div className={invalidFeedback}>{error}</div>)}
    </div>
  )
}

LoginRegisterInputs.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    formBox: PropTypes.string,
    invalidFeedback: PropTypes.string,
    invalidInput: PropTypes.string,
}

export default LoginRegisterInputs;