
import React from "react";
import { Box } from "./Box";
import { AnchorProvider } from "@project-serum/anchor";

const Supply = ({
  reservesData,
  userData,
  provider,
  callback
} : {
  reservesData: any;
  userData: any;
  provider: AnchorProvider | undefined;
  callback?: () => Promise<void>;
}) => {

  const BorrowEntry = (element: any, index: number) => {
    // *1. Need to calculate Supply and Borrow APRs
    const reserve = reservesData.filter((reserve) => reserve.data.pubkey.toBase58() === element.borrowReserve.toBase58())
    return (
        <tr key={index}>
            <td>SOL</td>
            <td>{(element.borrowedAmountWads.toNumber() / Math.pow(10, reserve[0].decimals)).toFixed(2)}</td> 
            <td>*1</td> 
            <td>{reserve[0].lAmount.toFixed(2)}</td> 
            <td>{(Number(reserve[0].data.data.liquidity.availableAmount) / Math.pow(10, reserve[0].data.data.liquidity.mintDecimals)).toFixed(2)}</td>
            <td>
              
            </td>
        </tr>
    ) 
}
  return (
    <div className="mt-[20px] p-[24px] w-[1106px] h-[281px] rounded-[15px] cursor-pointer  lg:w-[1226px] border bg-[#1C2442]">
      <div className="cardborder relative w-[1059px] h-[235px] lg:w-[1172px] rounded-[10px]">
        <div className="flex flex-row items-center justify-between w-full px-[44px]">
          <div className="flex flex-col justify-between w-full space-y-6">
            <div className=" flex flex-col items-start">
              <span className="flex flex-col">
                <h1 className="!text-slate-300 text-[14px] font-normal">
                 Value of Deposits
                </h1>
                <p className="text-[18px] font-normal">$0.00</p>
              </span>
            </div>
            <div className="cardborder-content3 h-1 w-full " />
            <div className=" flex flex-col items-start">
              <span className="flex flex-col">
                <h1 className="!text-slate-300 text-[14px] font-normal">
                  Allowed Borrowed Value
                </h1>
                <p className="text-[18px] font-normal">$0.00</p>
              </span>
            </div>
          </div>
          <div className="cardborder-content3 h-1 w-full " />
          <Box />
          <div className="cardborder-content3 h-1 w-full " />
          <div className="flex flex-col w-full pr-9 space-y-6">
            <div className=" flex flex-col items-start">
              <span className="flex flex-col">
                <h1 className="!text-slate-300 text-[14px] font-normal">
                Borrowed Value
                </h1>
                <p className="text-[18px] font-normal">$0.00</p>
              </span>
            </div>
            <div className="cardborder-content3 h-1 w-full " />
            <div className=" flex flex-col items-start">
              <span className="flex flex-col">
                <h1 className="!text-slate-300 text-[14px] font-normal">
                  Liquidation Threshold
                </h1>
                <p className="text-[18px] font-normal">$0.00</p>
              </span>
              <div className=" w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supply;
