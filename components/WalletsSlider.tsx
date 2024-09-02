import React, { useEffect, useState } from "react";
import Carousel from "./ui/Carousal";
import { Wallet } from "./Wallet";

// Define a type for wallet objects
interface WalletType {
    type: string;
    name: string;
    publicKey: string;
    secretKey: string;

}

interface WalletSliderProps {
    usd: number
}

export function WalletSlider({ usd }: WalletSliderProps) {
    const [wallets, setWallets] = useState<WalletType[]>([]);

    useEffect(() => {
        const temp = localStorage.getItem("wallets");
        if (temp) {
            setWallets(JSON.parse(temp));
        }
    }, []);

    const reRender = () => {
        const temp = localStorage.getItem("wallets");
        if (temp) {
            setWallets(JSON.parse(temp));
        }
    }

    const items: React.ReactNode[] = [
        ...wallets.map((wallet) => <Wallet key={wallet.publicKey} label={wallet.name} publicKey={wallet.publicKey} secretKey={wallet.secretKey} chain={wallet.type} usd={usd} reRender={reRender} />),
    ];

    return (
        <div className="w-full h-full flex justify-center">
            {items.length ?
                <Carousel items={items} />
                :
                <div className="flex justify-center items-center mb-52">
                    <div className="h-20 w-96 border-2 border-green-600 flex  flex-col justify-center items-center">
                        <div>
                            NO WALLET ADDED!
                        </div>
                        <div>
                            Click on add SOL wallet to add Wallet
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}
