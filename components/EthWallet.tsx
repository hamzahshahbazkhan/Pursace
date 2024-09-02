// import { useState } from 'react';
// import { mnemonicToSeed } from 'bip39';
// import { Wallet, HDNodeWallet } from "ethers";
// import { Button } from "@/components/ui/Button";


// interface EthWalletProps {
//     mnemonic: string;
// }


// export const EthWallet = ({ mnemonic }: EthWalletProps) => {

//     const [currentIndex, setCurrentIndex] = useState<number>(0);
//     const [addresses, setAddresses] = useState<string[]>([])

//     const addWallet = async () => {
//         const seed = await mnemonicToSeed(mnemonic);
//         const derivationPath = `m/44'/60'/${currentIndex}'/0'`
//         const hdNode = HDNodeWallet.fromSeed(seed);
//         console.log(seed);
//         console.log(hdNode);
//         const child = hdNode.derivePath(derivationPath);
//         console.log(child);
//         const privateKey = child.privateKey;
//         console.log(privateKey);
//         const wallet = new Wallet(privateKey);
//         console.log(wallet);
//         setCurrentIndex(currentIndex + 1);
//         setAddresses([...addresses, wallet.address])

//     }

//     return (
//         <div>
//             <Button label='Add ETH wallet' onClick={addWallet} className='h-16 w-96' />
//             {addresses.map(p =>
//                 <div>
//                     {p}
//                 </div>
//             )}

//         </div>
//     )
// }