"use client";
import { logo } from "@/assets";
import Image from "next/image";
import React from "react";
import { useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { truncate } from "@/utils";
require("@solana/wallet-adapter-react-ui/styles.css");

const styles = {
  wrapper:
    "flex w-full fixed top-0 z-[9999] items-center justify-around h-16 bg-[#151726] drop-shadow-lg shadow-[#151C36]",
};

const Navbar = () => {
  // Define the network for the wallet adapter
  const network = WalletAdapterNetwork.Devnet;

  const { connected, publicKey } = useWallet();
  const truncatedPublicKey = publicKey ? truncate(publicKey.toString()) : "";
  return (
    <header className={styles.wrapper}>
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="logo"
          className="w-[48px] h-[48px] object-contain"
        />
        <span className="font-normal text-[20px] bg-gradient-to-r from-[#9945ff] to-[#14f915] bg-clip-text text-transparent">
          Ultra
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="button">
          <span className="bg-gradient-to-r from-[#9945ff] to-[#14f915] bg-clip-text text-transparent text-[15px] font-medium">
            Solana
          </span>
        </button>
        <WalletMultiButton className="bg-gradient-to-r from-[#9945ff] to-[#14f915] !rounded-full">
          <span className="text-sm font-semibold ">
            {connected ? truncatedPublicKey : "Launch App"}
          </span>
        </WalletMultiButton>
      </div>
    </header>
  );
};

export default Navbar;

