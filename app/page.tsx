"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "@/components/SolanaWallet";
import { EthWallet } from "@/components/EthWallet";
import { Space_Mono } from "@next/font/google"
import { Navbar } from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mnemonics } from "@/components/Mnemonics";
import { Wallet } from "@/components/Wallet";
import { Landing } from "@/components/Landing";

const space_mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-spaceMono',
  weight: ["400", "700"]
})

export default function Home() {

  const [hasMnemonics, setHasMnemonics] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mnemonics = localStorage.getItem('mnemonics');
            setHasMnemonics(!!mnemonics);
        }
    }, []);


  const [mnemonics, setMnemonics] = useState("");
  const generateMnemonics = async () => {
    const words = await generateMnemonic();
    setMnemonics(words);
  }

  return (
    <div className={`${space_mono.variable} font-sans    flex flex-col align-middle text-green-100 bg-neutral-950 h-screen`}>
      <Navbar />
      {/* <div className="p-5 flex flex-col items-center"> */}

      {/* <Button label="Generate Mnemonics" onClick={generateMnemonics} className="h-16 w-96" /> */}
      {/* <Mnemonics/> */}
      {/* <Wallet label="Wallet1"/> */}



      {/* <div className="flex flex-row ">
        <div>
       <SolanaWallet mnemonic={mnemonics} />
        </div>
        <div className="pr-10">
      <EthWallet mnemonic={mnemonics} />
        </div>
      </div> */}
      {/* </div> */}

      {/* {mnemonics && <p>{mnemonics}</p>} */}
      <Landing/>  
      <Footer/> 

    </div>
  );
}
