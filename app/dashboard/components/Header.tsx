"use client";
import React from "react";
import Gradient from "./Gradient";

const Header = () => {
  return (
       <section className="min-h-screen flex flex-col mt-16 items-center justify-center space-y-9">
    <h1 className="text-4xl md:text-6xl lg:text-7xl text-center leading-[1.5] font-bold">
      Unleashing Digital Assets: <br className="hidden md:block"/> Powering Blockchain Performance
      </h1>
      <p className="text-xl text-center md:w-[50%] font-normal  text-gray-500">
        A multi-chain lending protocol built on Solana. We bring forward
        multi-chain asset classes married w/ collateralized lending in a simple
        fashion.
      </p>
      <label className="flex md:min-w-[600px] items-center h-16 space-x-2 button bg-transparent">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border-none outline-none focus:outline-none px-4 bg-transparent"
        />
        <button className="w-full bg-gradient-to-r from-[#9945ff] to-[#14f915] !rounded-full px-5 py-2.5">
          Signup for alpha
        </button>
      </label>
    </section>
  );
};

export default Header;
 
