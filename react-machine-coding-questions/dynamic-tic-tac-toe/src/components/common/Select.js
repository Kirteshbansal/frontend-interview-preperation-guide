import React from 'react';
import Text from './Text';

const inputName = `input-${Date.now()}`;

function Input({ label, name = inputName, onChange = () => { }, value = '', inputClasses = '', labelClasses = '', error = '', options = [], autoFocus = false }) {
    return (
        <div className='mx-2'>
            <>
                {label && <label htmlFor={name} className={labelClasses}>{label}</label>}
                <select autoFocus={autoFocus} name={name} id={name} value={value} onChange={onChange} className={inputClasses} >
                    {options.map((value, i) => <option key={i+1} value={value}>{value}</option>)}
                </select>
            </>
            {error && <Text classes={'text-red-500 text-xs mt-1'} text={`ℹ️ ${error}`} />}
        </div>
    )
}

export default Input