"use client";

import { useState, useEffect } from "react";
import { generateMnemonic } from "bip39";
import {  Button } from "./ui/Button";
import { SecondaryButton } from "./ui/SecondaryButton";
import { Container } from "./ui/Containers";
import { Main } from "./Main";
import { Input } from "./ui/Input";

export function Landing() {
    const [mnemonics, setMnemonics] = useState("");
    const [hasMnemonics, setHasMnemonics] = useState(false);
    const [secretPhrase, setSecretPhrase] = useState('')
    const [error, setError] = useState(false)


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMnemonics = localStorage.getItem('mnemonics');
            setHasMnemonics(!!storedMnemonics);
            if (storedMnemonics) {
                setMnemonics(storedMnemonics);
            }
        }
    }, []);

    const generateMnemonics = async () => {
        const words = await generateMnemonic();
        localStorage.setItem("mnemonics", words);
        localStorage.setItem("wallets", "")
        setMnemonics(words);
        setHasMnemonics(true);  
    };

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setSecretPhrase(event.currentTarget.value);
    };

    const handleSubmit = () => {
        if (secretPhrase) {
            const words = secretPhrase.trim().split(/\s+/);

            if (words.length === 12) {
                setMnemonics(secretPhrase);
                localStorage.setItem("mnemonics", secretPhrase);
                localStorage.setItem("wallets", "");
                setMnemonics(secretPhrase);
                setHasMnemonics(true);
            } else {
                setError(true);
                console.error("Input must be exactly 12 words.");
            }
        }
    };



    return (
        <div className="h-full w-full">
            {!hasMnemonics ? (
                <div className="grid grid-cols-2 gap-8 h-full w-full">

                    <div className="flex flex-col justify-center ml-28 mt-24 mb-40 ">
                        <div className="ml-2 flex flex-col justify-center">
                            <p className="mb-10 text-xl ">
                                Click on generate Mnemonics to get started.
                            </p>
                            <Button label="Generate Mnemonics" onClick={generateMnemonics} className="h-16 w-96" />

                        </div>
                        
                    </div>
                    <div className="flex justify-center items-center align-middle mr-10">
                        <Container className="h-[90%] w-full ">
                            <div className="px-0 p-4">
                                <p className=" text-2xl mb-4 bg-green-600 pl-4">
                                    Welcome to _pursace
                                </p>
                                <div className="px-4">
                                    <p className=" text-l mb-4">
                                        Pursace is a web-based Crypto wallet that supports multiple blockchains.
                                    </p>
                                    <p className=" text-l mb-4 mt-20">
                                        You can get started by generating the mnemonics or you can paste the existing mnemonics below
                                    </p>
                                    
                                    <Input onInput={handleInputChange} className="" />
                                    <div className="mb-0 m-3 flex justify-center items-center">
                                        <SecondaryButton onClick={handleSubmit} label="Submit" className="h-8 w-32" />
                                    </div>
                                    {error?<div>
                                        Please enter the correct secret phrase!
                                    </div>:<div></div>}
                                </div>

                            </div>
                        </Container>
                    </div>
                </div>

            ) : (
                <Main />
            )
            }
        </div>


    );
}
