import React, { useState, useEffect } from "react";
import { MouseEventHandler } from 'react';
import { Word } from "./ui/Word";
import { SecondaryButton } from "./ui/SecondaryButton";


interface MnemonicsProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Mnemonics({ onClick }: MnemonicsProps) {
    const [mnemonics, setMnemonics] = useState<string | null>(null);
    const [words, setWords] = useState<string[]>([]);

    const separateWords = () => {
        if (mnemonics) {
            const newWords: string[] = [];
            let currentWord = '';
            for (const char of mnemonics) {
                if (char !== ' ') {
                    currentWord += char;
                } else {
                    if (currentWord) {
                        newWords.push(currentWord);
                        currentWord = '';
                    }
                }
            }
            if (currentWord) {
                newWords.push(currentWord);
            }
            setWords(newWords);
        }
    };


    function copyToClipboard() {
        if (mnemonics) {
            navigator.clipboard.writeText(mnemonics)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    }


    useEffect(() => {
        const temp = localStorage.getItem('mnemonics');
        if (temp) {
            setMnemonics(temp);
            separateWords();
        }
    }, []);
    useEffect(() => {
        separateWords();
    }, [mnemonics]);

    return (
        <div className="relative">
            <div className="absolute inset-0 m-2 h-full w-full bg-green-600 transition-transform duration-500 ease-in-out"></div>
            <div className="relative bg-black pb-0 pt-4 p-4 border-2 border-green-600">
                <div className="text-2xl mb-1 flex flex-row">
                    <span className="w-10/12">Your Secret Phrase:</span>
                    <SecondaryButton className="h-7 w-24" label="Hide" onClick={onClick} />
                </div>
                <div className="grid grid-cols-4 grid-rows-3 gap-2">
                    {words.length > 0 ? (
                        words.map((word, index) => (
                            <Word key={index} label={word} />
                        ))
                    ) : (
                        <div>No words to display</div>
                    )}
                </div>
                <div className="mt-5">
                    <SecondaryButton className="h-7 w-full" label="Click To Copy" onClick={copyToClipboard} />
                </div>
            </div>
        </div>
    );
}
