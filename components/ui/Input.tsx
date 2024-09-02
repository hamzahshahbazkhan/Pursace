import React from 'react';

type InputProps = {
    label?: string;
    className?: string;
    value?: string;
    type?: string;
    onInput: (event: React.FormEvent<HTMLInputElement>) => void;
    readOnly?: string;
};

export function Input({ type, value, className = '',readOnly, onInput }: InputProps) {
    return (
        <div className='p-2'>
            <input type={type} onInput={onInput} value={value} className={`${className}h-8 w-full bg-black border-2 border-green-600 p-1 rounded-none focus:outline-none focus:ring-0 focus-visible:border-green-600 focus-within:border-green-600 focus:border-green-600` }  />
        </div>
    );
}
