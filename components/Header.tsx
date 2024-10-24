"use client";
import React, { useState } from "react";
import Gradient from "./Gradient";

const Header = () => {
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email to penrose@ultra.markets
    window.location.href = `mailto:penrose@ultra.markets?subject=Signup for Alpha&body=My email is: ${email}`;
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
    setEmail("");
  };

  return (
    <section className="min-h-screen flex flex-col mt-16 items-center justify-center space-y-9 relative">
      <h1 className="text-4xl md:text-6xl lg:text-7xl text-center leading-[1.5] font-bold">
        Unleashing Digital Assets: <br className="hidden md:block"/> Powering Blockchain Performance
      </h1>
      <p className="text-xl text-center md:w-[50%] font-normal  text-gray-500">
        Our Mission is to enable, empower and advance the truly decentralized world for more transparent, fair and efficient markets and products
      </p>
      <form onSubmit={handleSubmit} className="flex md:min-w-[500px] items-center h-16 space-x-2 button bg-transparent">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border-none outline-none focus:outline-none px-4 bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-gradient-to-r from-[#9945ff] to-[#14f915] !rounded-full px-5 py-2.5">
          Signup for alpha
        </button>
      </form>
      {showNotification && (
        <div className="absolute bottom-10 right-10 bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Email submitted successfully!</span>
        </div>
      )}
    </section>
  );
};

export default Header;
