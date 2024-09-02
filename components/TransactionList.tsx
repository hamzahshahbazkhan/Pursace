import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';

type TransactionDetail = {
    signature: string;
    amount: number;
};

type TransactionListProps = {
    transactions: TransactionDetail[];
    connection: Connection;
    onBack: () => void;
};

export function TransactionList({ transactions, connection, onBack }: TransactionListProps) {
    const [detailedTransactions, setDetailedTransactions] = useState<any[]>([]);

    const fetchTransactionDetails = async (signature: string, retries: number = 5): Promise<any | null> => {
        try {
            const transaction = await connection.getTransaction(signature);
            return transaction;
        } catch (error: any) {
            if (error.response && error.response.status === 429 && retries > 0) {
                const delay = Math.pow(2, 5 - retries) * 1000; 
                await new Promise((resolve) => setTimeout(resolve, delay));
                return fetchTransactionDetails(signature, retries - 1);
            } else {
                console.error('Error fetching transaction details:', error);
                return null;
            }
        }
    };

    useEffect(() => {
        const fetchAllTransactionDetails = async () => {
            const arr = [];
            for (const txn of transactions) {
                const detail = await fetchTransactionDetails(txn.signature);
                if (detail) {
                    arr.push(detail);
                    setDetailedTransactions([...arr]);
                }
                await new Promise((resolve) => setTimeout(resolve, 500)); 
            }
        };

        fetchAllTransactionDetails();
    }, [transactions]);

    return (
        <div className="h-full w-full">
            <div className="w-full h-6 border-b-2 border-green-600">
                <button className="bg-green-600 w-full h-full" onClick={onBack}>
                    Back
                </button>
            </div>
            {!detailedTransactions.length ? (
                <div className="h-full w-full flex justify-center items-center">
                    <div className="h-10 w-52 border-2 border-green-600 flex justify-center items-center">
                        NO TRANSACTIONS
                    </div>
                </div>
            ) : (
                <div className="p-1 overflow-y-auto">
                    {detailedTransactions.map((txn, index) => (
                        <div key={index} className="mb-2">
                            <div className="bg-black w-full h-6 text-xs flex align-bottom items-end pb-1 overflow-hidden">
                                {txn.transaction.signatures[0]}
                            </div>
                            <div className="bg-green-600 w-full h-6">
                                Amount: {((txn.meta.postBalances[2] - txn.meta.preBalances[2]) / 1_000_000_000).toFixed(9)} SOL
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
