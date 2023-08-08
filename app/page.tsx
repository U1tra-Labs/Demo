'use client'

import { Header } from "@/components";
import { useWallet, WalletProvider } from "@solana/wallet-adapter-react";

export default function Home() {
  const { connected } = useWallet();
  return (
    <main className="">
      {connected ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          Dashboard: Coming Soon
        </div>
      ) : (
        <Header />
      )}
    </main>
  );
}
