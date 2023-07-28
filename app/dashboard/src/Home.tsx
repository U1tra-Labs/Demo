import styled from "@emotion/styled";
import Gradient from "./Gradient";
import { logo } from "./assets";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  AnchorWallet,
} from "@solana/wallet-adapter-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import Loading from "./components/Loading";
import Reserves from "./components/Reserves";
import { parseLendingMarket } from "./utils/state";
import { getReserveAccounts } from "./components/actions/getReserveData";
import { getUserData } from "./components/actions/getUserData";
import { Tabs, Tab } from "react-bootstrap";
import Positions from "./components/Positions";
import * as pyth from "@pythnetwork/client";
import BigNumber from "bignumber.js";
import Navbar from "./Navbar";
import Header from "./components/Header";
import Supply from "./components/Supply";
import MarketCard from "./components/MarketCard";
import AssetCard from "./components/AssetCard";
import { Assets } from "./utils/constants";
const Home = () => {
  const wallet = useAnchorWallet() as AnchorWallet;
  const [setWallet] = useState(null); // Implement this
  const { connection } = useConnection();
  const [loading, setLoading] = useState<boolean>(true);
  const [reservesData, setReservesData] = useState<any>(undefined);
  const [userData, setUserData] = useState<any>(undefined);
  const [provider, setProvider] = useState<AnchorProvider | undefined>(
    undefined
  );

  const anchorWallet = useMemo(() => {
    const walletIsLoaded = wallet?.publicKey;

    if (walletIsLoaded) {
      return {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as unknown as typeof anchor.Wallet;
    }
  }, [wallet]);

  const refetchMarkets = useCallback(async () => {
    if (wallet && anchorWallet) {
      console.log("Loading Ultra info");
      setLoading(true);
      const provider = new AnchorProvider(
        connection,
        wallet,
        AnchorProvider.defaultOptions()
      );
      setProvider(provider);

      console.log("Init Pubkey Data");

      const lendingMarketPubkey = new PublicKey(
        "7T12b6nyt6vbgj1rvaW2PVvicTvsrdSY5YNNSchGTqLg"
      );

      console.log("Init Lending Market Info");

      const lendingMarketInfo = await connection.getAccountInfo(
        lendingMarketPubkey
      );

      console.log("Get Reserve accounts");

      const possiblyReservesData = await getReserveAccounts();

      console.log("Load Pyth Client");

      const pythClient = new pyth.PythHttpClient(
        connection,
        pyth.getPythProgramKeyForCluster("devnet")
      );

      console.log("Get Pyth Data");

      const data = await pythClient.getData();

      console.log("Locate Oracle ID");

      const oracleIds = possiblyReservesData.result.map((reserve) =>
        reserve.data?.data.liquidity.oraclePubkey.toBase58()
      );
      const filtered = data.products.filter((product) =>
        oracleIds.includes(product.price_account)
      );
      possiblyReservesData.result.forEach((reserve) => {
        const symbol = filtered.filter(
          (product) =>
            product.price_account ===
            reserve.data?.data.liquidity.oraclePubkey.toBase58()
        )[0].symbol;
        const price = data.productPrice.get(symbol)!.price;
        reserve!.data!.data.liquidity.marketPrice = new BigNumber(price!);
      });

      console.log("Updating Reserve Data");
      const { possiblyUserData, updatedReservesData } = await getUserData(
        wallet.publicKey,
        possiblyReservesData.result
      );
      if (possiblyUserData.length > 0) {
        setUserData(possiblyUserData);
      } else {
        console.log("No user obligation account");
        setUserData([]);
      }

      if (possiblyReservesData) {
        setReservesData(updatedReservesData);
        // Code below to refresh reserve data

        // for (let i=0; i<possiblyReservesData.result.length; i++) {
        //   console.log(possiblyReservesData.result[i].data?.pubkey.toBase58())
        //   const refreshIx = refreshReserveInstruction(possiblyReservesData.result[i].data?.pubkey!, possiblyReservesData.result[i].data?.data.liquidity.oraclePubkey!)

        //   await provider.sendAndConfirm(new Transaction().add(refreshIx), [])
        //   console.log(refreshIx)
        //   console.log("Oracle", possiblyReservesData.result[i].data?.data.liquidity.oraclePubkey.toBase58())
        //   console.log(possiblyReservesData.result[i].data?.data.liquidity.marketPrice.toNumber())
        // }
      }
      console.log("Here it is:", possiblyReservesData.result[0].data?.data);
      //   const program = await loadProgram(connection, anchorWallet);
      //   setAnchorProgram(program);
      setLoading(false);
    }
  }, [anchorWallet, connection, wallet]);

  useEffect(() => {
    refetchMarkets();
  }, [refetchMarkets]);
  

  const connect = () => {
    return <div></div>;
  };

  return (
    <div className="bg-[#1C2442] min-h-screen  text-white bg-hero-pattern bg-cover bg-no-repeat overflow-x-hidden ">
      <Header />
      <div className="mx-[167px] w-full">
        
        {!loading ? (
          <>
            <Supply
              reservesData={reservesData}
              userData={userData}
              provider={provider}
              callback={refetchMarkets}
            />
            
            <div className="flex mt-[20px] flex-col">
              <h1 className="text-2xl">Market</h1>
              <div className="flex flex-rap gap-12 mt-7 items-start">
                <MarketCard
                  // ... MarketCard props
                />
                
                {/* ... other MarketCards */}
              </div>
              
            </div>


            <div className="flex flex-wrap my-6 gap-6 mt-7 items-start">
              <AssetCard title="Supply Market" data={Assets} />
              <AssetCard title="Borrow Market" data={Assets} isLiquidity />
            </div>
                   
          </>
        ) : (
          !wallet ? connect() : <div>Loading...</div> // Placeholder, need to replace with your actual Loading component
        )}
      </div>
    </div>
  );
};

export default Home;

const Body = styled.div`
  width: 95vw;
  margin: 20px;
`;

const SocialLink = styled.a`
  color: white;
  :hover {
    color: var(--color-accent-active);
  }
`;

const WalletDisconnectButtonStyled = styled(WalletDisconnectButton)`
  background: black;
  color: white;
  height: 40px;
  justify-content: center;
  border-radius: 9px;
  padding: 5px;
  min-width: 150px;
  :not([disabled]):hover {
    background: #d42fb8;
  }
  i {
    display: none;
  }
`;

const WalletMultiButtonStyled = styled(WalletMultiButton)`
  background: blue;
  color: white;
  height: 40px;
  justify-content: center;
  border-radius: 9px;
  padding: 5px;
  min-width: 150px;
  :not([disabled]):hover {
    background: #d42fb8;
  }
  i {
    display: none;
  }
`;

const Title = styled.div`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;
