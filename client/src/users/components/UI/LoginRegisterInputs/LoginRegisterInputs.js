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
    inputClass,
    disabled,
    onFocus,
    onKeyDown,
    required,
    max,
    min
}) => {
    return (
        <React.Fragment>
            { formBox ? 
            <div className={formBox}>
                {label && <label>{label}</label>}
                <input 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    className={classnames(inputClass ? inputClass : '', {
                        [invalidInput]: error
                    })}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    disabled={disabled}
                    max={max ? max : null}
                    min={min ? min : null}
                    required={required ? required : null}/>

                    {error && <div className={invalidFeedback}>{error}</div>}
            </div> : 
            <React.Fragment>
                <input 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    className={classnames(inputClass ? inputClass : '', {
                        [invalidInput]: error
                    })}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    disabled={disabled}
                    min={min ? min : null}
                    max={max ? max : null}
                    required={required ? required : null}/>

                    {error && <div className={invalidFeedback}>{error}</div>}
            </React.Fragment>}
    </React.Fragment>
  )
}

LoginRegisterInputs.propTypes = {
    placeholder: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    formBox: PropTypes.string,
    invalidFeedback: PropTypes.string,
    invalidInput: PropTypes.string,
}

export default LoginRegisterInputs;