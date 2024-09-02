

import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { SmallButton } from './ui/Button';
import { Connection, PublicKey } from '@solana/web3.js';
import { TransactionList } from './TransactionList';


type WalletProps = {
    reRender: () => void;
    chain: string;
    label: string;
    publicKey: string;
    secretKey: string;
    className?: string;
    usd: number
};

type TransactionDetail = {
    signature: string;
    amount: number;
};

export function Wallet({ label, reRender, publicKey, secretKey, chain, usd }: WalletProps) {
    const [currBal, setCurrBal] = useState(0);
    const [lamport, setLamport] = useState('000000000');
    const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
    const [showTransaction, setShowTransaction] = useState(false);

    // const RPC_URL = process.env.URL;
    const api = process.env.APIKEYFOR;
    console.log(process.env.HELLO)
    console.log("slj")
    console.log(api)

    const RPC_URL: string = `https://mainnet.helius-rpc.com/?api-key=${process.env.API}`;

    if (!api) {
        console.log("NO API FOUND")
    }

    const connection = new Connection(RPC_URL, 'confirmed');
    const WalletPublicKey = new PublicKey(publicKey);

    useEffect(() => {
        // console.log(api)
        console.log("DFJLD")
        const getBalance = async () => {
            try {
                console.log("here");

                const balance = await connection.getBalance(WalletPublicKey);
                const txn = await connection.getSignaturesForAddress(WalletPublicKey, {
                    limit: 6,
                });
                console.log(balance);


                const txnDetails: TransactionDetail[] = txn.map((tx) => ({
                    signature: tx.signature,
                    amount: 0,
                }));

                setTransactions(txnDetails);

                const solBalance = balance / 1_000_000_000;
                const inUsd = solBalance * usd;
                console.log(inUsd);
                const truncatedSolBalance: number = Math.floor(inUsd * 100) / 100;

                console.log(truncatedSolBalance)
                setCurrBal(truncatedSolBalance);



                const balanceStr = balance.toString();
                const paddedBalance = balanceStr.padStart(9, '0');
                setLamport(paddedBalance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        getBalance();
    }, []);

    function copyPublicKey() {
        if (publicKey) {
            navigator.clipboard.writeText(publicKey);
        }
    }

    function copySecretKey() {
        if (secretKey) {
            navigator.clipboard.writeText(secretKey);
        }
    }

    function toggleTransaction() {
        setShowTransaction(!showTransaction);
    }

    function deleteWallet() {
        const wallets = localStorage.getItem('wallets')
        let parseWallet
        if (wallets) {
            parseWallet = JSON.parse(wallets);
        }
        const newWallet = parseWallet.filter((wallet: any) => wallet.publicKey !== publicKey)
        localStorage.setItem('wallets', JSON.stringify(newWallet));
        reRender()
    }

    return (
        <div className="relative h-96 w-96">
            <div className="absolute inset-0 m-2 bg-green-600 h-96 w-96 transition-transform duration-500 ease-in-out"></div>
            <div className="relative border-2 border-green-600 bg-black h-96 w-96">
                {!showTransaction ? (
                    <div>
                        <div className="bg-green-600 mt-4 flex flex-row justify-between">
                            <div className="text-2xl p-2 overflow-hidden">{label}</div>
                            <div className="mr-4 text-xl mt-2">{chain}</div>
                        </div>
                        <div className="text-5xl flex items-center justify-center align-middle pb-2 p-6">
                            ${currBal}
                        </div>
                        <div className="text-xl flex items-center justify-center align-middle">
                            {lamport} lamport
                        </div>
                        <div className="p-2 mt-6">
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    value={publicKey}
                                    className="h-8 w-full bg-black border-2 border-green-600 p-1"
                                    readOnly
                                />
                                <button className="bg-green-600 h-8 w-8 flex items-center justify-center" onClick={copyPublicKey}>
                                    <img className='h-[60%]' src="copy.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="flex w-full">
                                <input
                                    type="password"
                                    value={secretKey}
                                    className="h-8 bg-black border-2 border-green-600 p-1 w-full"
                                    readOnly
                                />
                                <button className="bg-green-600 h-8 w-8 flex items-center justify-center" onClick={copySecretKey}>
                                    <img className='h-[60%]' src="copy.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row px-6 pt-2 gap-6">
                            <SmallButton className="h-16 w-16" label="txns" svg={<img className="w-[50%] rotate-90 " src='transaction.svg' />} onClick={toggleTransaction} />
                            <SmallButton className="h-16 w-16" label="send" svg={<img className="w-[50%]" src='send.svg' />} />
                            <SmallButton className="h-16 w-16" label="swap" svg={<img className="w-[50%]" src='transaction.svg' />} />
                            <SmallButton className="h-16 w-16" label="delete" svg={<img className="w-[50%]" src='delete.svg' />} onClick={deleteWallet} />
                        </div>
                    </div>
                ) : (
                    <TransactionList transactions={transactions} connection={connection} onBack={toggleTransaction} />
                )}
            </div>
        </div>
    );
}
