import React from 'react';

type ButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    label: string;
    className?: string;
};

export function SecondaryButton({ label, onClick, className = '' }: ButtonProps) {
    return (
        <div className="h-12 text-base">
            <div className="relative">
                <div
                    className={`absolute inset-0 m-1 border-2 border-green-600 ${className} transition-transform duacration-500 ease-in-out`}
                ></div>
                <button
                    className={`relative ${className} transition-all duration-500 ease-in-out hover:m-1 active:bg-black`}
                    onClick={onClick}
                >
                    <div
                        className={` bg-green-600  ${className} transition-transform duration-500 ease-in-out active:bg-black active:border-2 active`}
                    >
                        {label}
                    </div>
                </button>
            </div>
        </div>
    );
}
