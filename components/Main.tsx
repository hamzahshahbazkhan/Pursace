import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Form } from "./Form";
import { Mnemonics } from "./Mnemonics";
import { WalletSlider } from "./WalletsSlider";

export function Main() {
    const [mnemonics, setMnemonics] = useState(false);
    const [buttonText, setButtonText] = useState('Mnemonics');
    const [hasMnemonics, setHasMnemonics] = useState(false);
    const [form, setForm] = useState(false);
    const [formKey, setFormKey] = useState(0); 
    const [solanaPrice, setSolanaPrice] = useState(0);
    const [comingSoon, setComingSoon] = useState(false);

    const showMnemonics = () => {
        setMnemonics(!mnemonics);
        setButtonText(buttonText === 'Mnemonics' ? 'Wallets' : 'Mnemonics');
    };

    const openForm = () => {
        setForm(!form);
    };
    const openEthForm = () => {
        setComingSoon(!comingSoon);
    };

    const submit = () => {
        setForm(false);
        setFormKey(prevKey => prevKey + 1); 
    };

    useEffect(() => {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const solanaPrice = data.solana.usd;
                setSolanaPrice(solanaPrice);
                console.log(`The current price of Solana (SOL) is $${solanaPrice}`);
            })
            .catch(error => console.error('Error fetching price:', error));

    }, []);

    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-3 gap-8 h-full w-full">
                <div className="col-span-1">
                    <div className="flex flex-col justify-center m-16">
                        <Button label={`View ${buttonText}`} onClick={showMnemonics} className="h-16 w-96" />
                    </div>
                    {!form && !comingSoon ? (
                        <div className="flex flex-col justify-center m-16">
                            <Button label="Add SOL Wallet" onClick={openForm} className="h-16 w-96" />
                            <Button label="Add ETH Wallet" onClick={openEthForm} className="h-16 w-96" />
                        </div>
                    ) : comingSoon ? (
                        <div className="flex justify-center m-16">
                            <Form wallet="ETH" onSubmit={openEthForm} key={formKey} />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center m-16">
                            <Form wallet="SOL" onSubmit={submit} key={formKey} />
                        </div>
                    )}


                </div>
                <div className="col-span-2 flex justify-center m-8">
                    {mnemonics ?
                        <div className="mt-8">
                            <Mnemonics onClick={showMnemonics} />
                        </div>
                        : <WalletSlider key={formKey} usd={solanaPrice} />} 
                </div>
            </div>
        </div>
    );
}
