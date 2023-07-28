'use client'
import React, { useEffect } from "react"; 
import { Header } from "@/components";
import { useWallet, WalletProvider } from "@solana/wallet-adapter-react";

const startApp = () => {
  // Your code to start another app goes here
  // For example, you can use window.open() to open a new window/tab with the app URL
  window.open("https://app.ultra.sx", "Dashboard");
};


export default function Home() {
  const { connected } = useWallet();

  // useEffect hook to start another app when connected state changes
  useEffect(() => {
    if (connected) {
      startApp();
    }
  }, [connected]);

  return (
    <main className="">
      {connected ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          Connected! Starting App...
        </div>
      ) : (
        <Header />
      )}
    </main>
  );
}