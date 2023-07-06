'use client'
import { Navbar } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  CloverWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = useMemo(() => "https://rpc-devnet.helius.xyz/?api-key=0f8a8423-3f18-414e-b81e-c6cfe5405be0", []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return (
    <html lang="en">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
            </body>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </html>
  );
}
