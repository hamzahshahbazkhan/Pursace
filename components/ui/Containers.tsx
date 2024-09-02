import React from 'react';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export function Container({ children, className = '' }: ContainerProps) {
    return (
        <div className={`relative  ${className}`}>
            <div
                className={`absolute inset-0 m-1 bg-green-600 ${className} `}
            ></div>
            <div
                className={`relative border-2 border-green-600 bg-black ${className} `}
            >
                {children}
            </div>
        </div>
    );
}
    