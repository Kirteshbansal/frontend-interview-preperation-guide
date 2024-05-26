import React from 'react';
import Text from './Text';

function Input({ label, name = `input-${Date.now()}`, onChange = () => { }, value = '', inputClasses = '', labelClasses = '', min = 3, max = 10, type = "text", error = '' }) {
    return (
        <div className='mx-2'>
        <>
            {label && <label htmlFor={name} className={labelClasses}>{label}</label>}
            <input type={type} name={name} id={name} value={value} onChange={onChange} className={inputClasses} {...((min || max) && {min, max})}/>
            </>
            {error && <Text classes={'text-red-500 text-xs mt-1'} text={`ℹ️ ${error}`}/>}
        </div>
    )
}

export default Input