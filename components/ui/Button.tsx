import React, { ReactNode } from 'react';

type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    label: string | ReactNode;
    className?: string;
    svg?: ReactNode;
};

export function Button({ label, onClick, className = '' }: ButtonProps) {
    return (
        <div className="h-24 ">
            <div className="relative">
                <div
                    className={`absolute inset-0 m-2 bg-green-600 ${className} transition-transform duacration-500 ease-in-out`}
                ></div>
                <button
                    className={`relative border-neutral-100 ${className} transition-all duration-500 ease-in-out hover:m-2 active:bg-green-600`}
                    onClick={onClick}
                >
                    <div
                        className={`border-2 border-green-600 bg-black text-3xl p-2 ${className} transition-transform duration-500 ease-in-out active:bg-green-600`}
                    >
                        {label}
                    </div>
                </button>
            </div>
        </div>
    );
}

export function SmallButton({ label, onClick, className = '', svg }: ButtonProps) {
    return (
        <div className="h-24 ">
            <div className="relative">
                <div
                    className={`absolute inset-0 m-1 bg-green-600 ${className} transition-transform duacration-500 ease-in-out`}
                ></div>
                <button
                    className={`relative border-neutral-100 ${className} transition-all duration-500 ease-in-out hover:m-1 active:bg-green-600`}
                    onClick={onClick}
                >
                    <div
                        className={`border-2 border-green-600 bg-black text-xs pt-2 pb-1 flex flex-col items-center justify-center ${className} transition-transform duration-500 ease-in-out active:bg-green-600 `}
                    >
                        {svg}
                        {label}
                    </div>
                </button>
            </div>
        </div>
    );
}

export function MediumButton({ label, onClick, className = '' }: ButtonProps) {
    return (
        <div className="h-24 ">
            <div className="relative">
                <div
                    className={`absolute inset-0 m-1 bg-green-600 ${className} transition-transform duacration-500 ease-in-out`}
                ></div>
                <button
                    className={`relative border-neutral-100 ${className} transition-all duration-500 ease-in-out hover:m-1 active:bg-green-600`}
                    onClick={onClick}
                >
                    <div
                        className={`border-2 flex justify-center items-center border-green-600 bg-black  ${className} transition-transform duration-500 ease-in-out  active:bg-green-600`}
                    >
                        {label}
                    </div>
                </button>
            </div>
        </div>
    );
}