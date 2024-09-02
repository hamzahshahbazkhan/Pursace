// import nacl from 'tweetnacl';
// import { mnemonicToSeed } from 'bip39';
// import { Keypair } from '@solana/web3.js';
// import { derivePath } from 'ed25519-hd-key';
// import { useState } from 'react';
// import { Button } from './ui/Button';

// interface SolanaWalletProps {
//     mnemonic: string;
// }


// export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
//     const [currentIndex, setCurrentIndex] = useState<number>(0);
//     const [publicKeys, setPublicKeys] = useState<string[]>([]);

//     const addWallet = async () => {
//         const seed = await mnemonicToSeed(mnemonic);
//         console.log("hello");
//         console.log("SEED:")
//         console.log(seed.toString("binary"));
//         console.log(seed.toString("hex"));

//         const path = `m/44'/501'/${currentIndex}'/0'`;
//         console.log("Path:")
//         console.log(path);
//         const derivedSeed = derivePath(path, seed.toString("hex")).key;
//         console.log("Derived Seed:")
//         console.log(derivedSeed);
//         const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
//         console.log("Secret:")
//         console.log(secret);
//         const keypair = Keypair.fromSecretKey(secret);
//         console.log("Keypair:")
//         console.log(keypair);
//         setCurrentIndex(currentIndex + 1);
//         setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);

//     }

//     return <div>
//         <Button label='Add SOL wallet' onClick={addWallet} className='h-16 w-96' />
//         {publicKeys.map(p => <div>
//             {p}
//         </div>)}
//     </div>
// }