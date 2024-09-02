import React, { MouseEventHandler, useState, useEffect } from 'react';
import { Container } from './ui/Containers';
import { Input } from './ui/Input';
import { MediumButton } from './ui/Button';
import nacl from 'tweetnacl';
import { mnemonicToSeed } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';

interface FormProps {
    wallet: string;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
}

export function Form({ wallet, onSubmit }: FormProps) {
    const [mnemonics, setMnemonics] = useState("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]);
    const [walletName, setWalletName] = useState<string>("Wallet1")
    const [wallets, setWallets] = useState<any[]>([])
    const [buttonText, setButtonText] = useState('OK')
    const [text, setText] = useState('Enter the name for the Wallet')

    useEffect(() => {
        const temp = localStorage.getItem("wallets");
        if (temp) {
            const parsedWallets = JSON.parse(temp);
            if(wallet=='ETH'){
                setButtonText("Back")
                setText("Coming Soon....")
            }

            if (parsedWallets.length > 0) {
                const prevWallet = parsedWallets[parsedWallets.length - 1];
                const prevIndex = prevWallet.index;
                setCurrentIndex(prevIndex + 1); 
            }

            setWallets(parsedWallets); 
        }
    }, []);

    useEffect(() => {
        const temp = localStorage.getItem("mnemonics");
        if (temp) {
            setMnemonics(temp);
        }
    }, []);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setWalletName(event.currentTarget.value);
    };

    const addWallet = async () => {
        const seed = await mnemonicToSeed(mnemonics);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        console.log(keypair)

        setCurrentIndex((prevIndex: number) => {
            const newIndex = prevIndex + 1;
            console.log(newIndex);
            return newIndex;
        });

        console.log(currentIndex);
        setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        const currentWallet = {

            type: wallet,
            index: currentIndex,
            name: walletName,
            publicKey: keypair.publicKey.toBase58(),
            secretKey: bs58.encode(keypair.secretKey),
        }

        setWallets(prevWallets => {
            const updatedWallets = [...prevWallets, currentWallet];
            localStorage.setItem("wallets", JSON.stringify(updatedWallets));
            return updatedWallets;
        });
        localStorage.setItem("wallets", JSON.stringify(wallets));
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        await addWallet();
        onSubmit(event);
    };

    return (
        <Container className='h-52 w-96'>
            <div className='bg-green-600 mt-3 px-2 py-1 text-lg'>
                {wallet}
            </div>
            <div className='pt-4 p-8'>
                <div className='ml-2 mb-3'>
                    {text}
                </div>
                <Input label='Wallet1' onInput={handleInputChange} />
                <div className='flex justify-center items-center mt-3'>
                    <MediumButton className='h-8 w-16' label={buttonText} onClick={handleClick} />
                </div>
            </div>
        </Container>
    );
}
