import React from 'react';

type ButtonProps = {
   
    label: string;
    className?: string;
};


export function Word({ label,  className = '' }: ButtonProps) {
    return (
        <div className="h-16 w-48 pb-8 p-6 border-2 border-green-600 ">

            <div
                className={` m-2 ${className} transition-transform duacration-500 ease-in-out`}
            >{label}
            </div>


        </div>
    );
}
